-- =============================================
-- SCHEMA SUPABASE POUR 2KF SÉCURITÉ
-- Backend de gestion des demandes de contact
-- =============================================

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: admin_users (CRÉÉE EN PREMIER - pas de dépendances)
-- Utilisateurs administrateurs du dashboard
-- =============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    
    role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'viewer')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Index pour la connexion
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- =============================================
-- TABLE: contact_requests (CRÉÉE EN SECOND - référence admin_users)
-- Stocke toutes les demandes de devis et contacts
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Informations du contact
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    
    -- Détails de la demande
    service_type TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact-form',
    
    -- Gestion et suivi
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'pending', 'contacted', 'converted', 'archived')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    notes TEXT,
    assigned_to UUID REFERENCES public.admin_users(id),
    
    -- Métadonnées
    ip_address TEXT,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    responded_at TIMESTAMP WITH TIME ZONE
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON public.contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_is_read ON public.contact_requests(is_read);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_requests_updated_at
    BEFORE UPDATE ON public.contact_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- TABLE: activity_logs
-- Journal des actions administratives
-- =============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    admin_id UUID REFERENCES public.admin_users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address TEXT
);

-- Index pour les logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON public.activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON public.activity_logs(entity_type, entity_id);

-- =============================================
-- POLITIQUES RLS (Row Level Security)
-- =============================================

-- Activer RLS sur les tables
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Politique: Permettre l'insertion publique pour les formulaires de contact
CREATE POLICY "Allow public insert on contact_requests" 
ON public.contact_requests 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Politique: Les admins peuvent tout voir et modifier
CREATE POLICY "Allow authenticated access to contact_requests" 
ON public.contact_requests 
FOR ALL 
TO authenticated
USING (true);

-- Politique: Les admins peuvent voir leurs propres données
CREATE POLICY "Allow authenticated access to admin_users" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (true);

-- Politique: Les admins peuvent voir les logs
CREATE POLICY "Allow authenticated access to activity_logs" 
ON public.activity_logs 
FOR ALL 
TO authenticated
USING (true);

-- =============================================
-- VUES UTILITAIRES
-- =============================================

-- Vue: Statistiques des demandes
CREATE OR REPLACE VIEW public.contact_requests_stats AS
SELECT 
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE status = 'new') as new_count,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_count,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_count,
    COUNT(*) FILTER (WHERE status = 'archived') as archived_count,
    COUNT(*) FILTER (WHERE is_read = false) as unread_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as today_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as week_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as month_count
FROM public.contact_requests;

-- Vue: Demandes par type de service
CREATE OR REPLACE VIEW public.contact_requests_by_service AS
SELECT 
    service_type,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_count,
    ROUND(COUNT(*) FILTER (WHERE status = 'converted')::numeric / NULLIF(COUNT(*), 0) * 100, 2) as conversion_rate
FROM public.contact_requests
GROUP BY service_type
ORDER BY count DESC;

-- =============================================
-- DONNÉES INITIALES
-- =============================================

-- Créer un admin par défaut (mot de passe: Admin2024!)
-- Le hash correspond à "Admin2024!" avec bcrypt
INSERT INTO public.admin_users (email, password_hash, name, role)
VALUES (
    'admin@2kf-securite.fr',
    '$2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm',
    'Administrateur',
    'admin'
) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- =============================================
-- FONCTIONS UTILITAIRES
-- =============================================

-- Fonction: Marquer comme lu
CREATE OR REPLACE FUNCTION mark_contact_as_read(contact_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.contact_requests
    SET is_read = TRUE
    WHERE id = contact_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction: Obtenir les statistiques
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total', COUNT(*),
        'new', COUNT(*) FILTER (WHERE status = 'new'),
        'pending', COUNT(*) FILTER (WHERE status = 'pending'),
        'contacted', COUNT(*) FILTER (WHERE status = 'contacted'),
        'converted', COUNT(*) FILTER (WHERE status = 'converted'),
        'unread', COUNT(*) FILTER (WHERE is_read = false),
        'today', COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours'),
        'thisWeek', COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days'),
        'thisMonth', COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')
    ) INTO result
    FROM public.contact_requests;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

