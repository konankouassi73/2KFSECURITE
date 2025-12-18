-- =============================================
-- SCRIPT DE RÉINITIALISATION COMPLÈTE
-- =============================================
-- ⚠️ ATTENTION : Ce script supprime TOUTES les données !
-- Utilisez uniquement en développement ou si vous voulez tout réinitialiser
-- =============================================

-- Supprimer les tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS public.activity_logs CASCADE;
DROP TABLE IF EXISTS public.contact_requests CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Supprimer les fonctions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS mark_contact_as_read(UUID) CASCADE;
DROP FUNCTION IF EXISTS get_dashboard_stats() CASCADE;

-- Supprimer les vues
DROP VIEW IF EXISTS public.contact_requests_stats CASCADE;
DROP VIEW IF EXISTS public.contact_requests_by_service CASCADE;

-- Maintenant exécutez le fichier schema.sql normal

