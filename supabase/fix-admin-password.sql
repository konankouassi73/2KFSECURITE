-- =============================================
-- SCRIPT DE CORRECTION : Mot de passe admin
-- =============================================
-- Ce script corrige le mot de passe admin dans Supabase
-- Mot de passe : Admin2024!
-- Hash : $2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm

-- Option 1 : Mettre à jour l'utilisateur existant
UPDATE public.admin_users
SET 
    password_hash = '$2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm',
    is_active = true
WHERE email = 'admin@2kf-securite.fr';

-- Option 2 : Créer l'utilisateur s'il n'existe pas
INSERT INTO public.admin_users (email, password_hash, name, role, is_active)
VALUES (
    'admin@2kf-securite.fr',
    '$2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm',
    'Administrateur',
    'admin',
    true
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    is_active = true;

-- Vérifier que l'utilisateur existe et est actif
SELECT 
    id,
    email,
    name,
    role,
    is_active,
    created_at,
    last_login
FROM public.admin_users
WHERE email = 'admin@2kf-securite.fr';

