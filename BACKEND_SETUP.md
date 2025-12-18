# Configuration du Backend Admin - 2KF SÉCURITÉ

## 📋 Prérequis

1. Un compte [Supabase](https://supabase.com) (gratuit)
2. Node.js 18+ installé

## 🚀 Installation

### 1. Créer un projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez les informations suivantes :
   - **Project URL** : `https://votre-projet.supabase.co`
   - **anon/public key** : Clé publique
   - **service_role key** : Clé de service (dans Settings > API)

### 2. Configurer la base de données

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. **IMPORTANT** : Si vous avez déjà essayé d'exécuter le schéma et obtenu une erreur, exécutez d'abord `supabase/reset-schema.sql` pour nettoyer
3. Copiez et exécutez le contenu du fichier `supabase/schema.sql` **en une seule fois**
4. Cela créera dans le bon ordre :
   - La table `admin_users` pour les administrateurs (créée en premier)
   - La table `contact_requests` pour les demandes (référence admin_users)
   - La table `activity_logs` pour l'historique (référence admin_users)
   - Un admin par défaut

**⚠️ Note** : Le schéma a été corrigé pour créer les tables dans le bon ordre. Si vous obtenez l'erreur `relation "public.admin_users" does not exist`, utilisez `reset-schema.sql` puis réexécutez `schema.sql`.

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service-role

# JWT (générez avec: openssl rand -base64 32)
JWT_SECRET=votre-secret-jwt-sécurisé
```

### 4. Créer un admin personnalisé

Pour créer un nouvel administrateur, exécutez ce SQL dans Supabase :

```sql
-- Remplacez les valeurs par les vôtres
INSERT INTO public.admin_users (email, password_hash, name, role)
VALUES (
  'votre@email.com',
  -- Hash généré pour votre mot de passe
  '$2a$10$...', 
  'Votre Nom',
  'admin'
);
```

Pour générer le hash du mot de passe, utilisez ce script Node.js :

```javascript
const bcrypt = require('bcryptjs')
const hash = bcrypt.hashSync('VotreMotDePasse', 10)
console.log(hash)
```

## 🔐 Accès au Dashboard Admin

Une fois configuré, accédez au dashboard via :

**URL** : `http://localhost:3000/admin` (ou votre domaine en production)

**Identifiants par défaut** :
- Email : `admin@2kf-securite.fr`
- Mot de passe : `Admin2024!`

⚠️ **IMPORTANT** : Changez ces identifiants en production !

## 📊 Fonctionnalités

### Dashboard (`/admin/dashboard`)
- Vue d'ensemble des statistiques
- Dernières demandes reçues
- Compteur de demandes non lues

### Gestion des demandes (`/admin/requests`)
- Liste paginée et filtrable
- Recherche par nom, email, téléphone
- Filtres par statut, priorité, lecture
- Export (à venir)

### Détail d'une demande (`/admin/requests/[id]`)
- Toutes les informations du contact
- Modification du statut et de la priorité
- Notes internes
- Actions rapides (email, téléphone)

### Statistiques (`/admin/stats`)
- Graphique des 7 derniers jours
- Répartition par statut
- Taux de conversion par service

## 🛡️ Sécurité

- **Authentification JWT** avec cookies HttpOnly
- **Rate limiting** sur les API publiques
- **Row Level Security (RLS)** sur Supabase
- **Validation** des données côté serveur
- **Sanitization** contre les injections

## 📁 Structure des fichiers

```
app/
├── admin/
│   ├── layout.tsx          # Layout admin (noindex)
│   ├── page.tsx             # Redirection vers login
│   ├── login/
│   │   └── page.tsx         # Page de connexion
│   ├── dashboard/
│   │   └── page.tsx         # Tableau de bord
│   ├── requests/
│   │   ├── page.tsx         # Liste des demandes
│   │   └── [id]/
│   │       └── page.tsx     # Détail d'une demande
│   └── stats/
│       └── page.tsx         # Statistiques
├── api/
│   ├── contact/
│   │   └── route.ts         # API publique de contact
│   └── admin/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── me/route.ts
│       ├── requests/
│       │   ├── route.ts     # Liste/Create
│       │   └── [id]/route.ts # Get/Update/Delete
│       └── stats/
│           └── route.ts

components/
└── admin/
    ├── AdminSidebar.tsx
    └── AdminHeader.tsx

hooks/
└── useAdmin.ts              # Hook d'authentification

lib/
├── auth.ts                  # Fonctions d'auth
└── supabase/
    ├── client.ts            # Client navigateur
    ├── server.ts            # Client serveur
    └── types.ts             # Types TypeScript

supabase/
└── schema.sql               # Schéma de la BDD
```

## 🔄 Workflow des demandes

1. **Nouveau** → La demande vient d'arriver
2. **En attente** → À traiter prochainement
3. **Contacté** → Le client a été contacté
4. **Converti** → Le client a signé un contrat
5. **Archivé** → Demande terminée ou annulée

## 📧 Notifications email (optionnel)

Pour recevoir des notifications par email à chaque nouvelle demande, vous pouvez :

1. Configurer un webhook Supabase vers un service email
2. Utiliser les Database Triggers avec Edge Functions
3. Intégrer un service comme Resend ou SendGrid

## 🐛 Dépannage

### Erreur "Non authentifié"
- Vérifiez que `JWT_SECRET` est défini
- Effacez les cookies du navigateur
- Reconnectez-vous

### Erreur Supabase
- Vérifiez les variables d'environnement
- Assurez-vous que le schéma SQL a été exécuté
- Vérifiez les politiques RLS

### Le formulaire ne sauvegarde pas
- Vérifiez la console pour les erreurs
- Assurez-vous que Supabase est accessible
- Le fallback log console reste actif si la BDD échoue

## 📞 Support

Pour toute question, contactez le développeur ou consultez la documentation Supabase.

