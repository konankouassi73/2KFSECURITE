# 🔍 Guide de Débogage - Problème de Connexion Admin

## ✅ Vérifications à faire

### 1. Vérifier le hash du mot de passe dans Supabase

Exécutez cette requête dans l'éditeur SQL de Supabase :

```sql
SELECT 
    email,
    password_hash,
    is_active,
    role
FROM public.admin_users
WHERE email = 'admin@2kf-securite.fr';
```

**Le hash doit être** : `$2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm`

Si le hash est différent, exécutez :

```sql
UPDATE public.admin_users
SET password_hash = '$2b$10$OvzsbzbVGo024GLTfK2l7ulJqlax9hEacNW0BjS6GBiRMACWHyzhm'
WHERE email = 'admin@2kf-securite.fr';
```

### 2. Vérifier les variables d'environnement sur Vercel

1. Allez sur [vercel.com](https://vercel.com) → votre projet
2. **Settings** → **Environment Variables**
3. Vérifiez que ces variables existent et sont correctes :

| Variable | Doit contenir |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://votre-projet.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Votre clé anon (commence par `eyJ...`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Votre clé service role (commence par `eyJ...`) |
| `JWT_SECRET` | Un secret aléatoire (64+ caractères) |

**⚠️ IMPORTANT** : 
- Toutes les variables doivent être cochées pour **Production**, **Preview** ET **Development**
- Après modification, **redéployez** le projet

### 3. Vérifier les permissions RLS dans Supabase

Exécutez cette requête pour vérifier les politiques RLS :

```sql
-- Vérifier que RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'admin_users';
```

Si RLS bloque l'accès, vous pouvez temporairement le désactiver pour tester :

```sql
-- ⚠️ TEMPORAIRE - Pour tester uniquement
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
```

**⚠️ ATTENTION** : Réactivez RLS après les tests !

### 4. Tester la connexion avec curl

Testez directement l'API depuis votre terminal :

```bash
curl -X POST https://2kfsecurite.vercel.app/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@2kf-securite.fr","password":"Admin2024!"}'
```

Si vous obtenez une erreur, regardez le message d'erreur retourné.

### 5. Vérifier les logs Vercel

1. Allez sur Vercel → votre projet → **Deployments**
2. Cliquez sur le dernier déploiement
3. Ouvrez l'onglet **"Functions"** ou **"Logs"**
4. Essayez de vous connecter et regardez les logs en temps réel

### 6. Vérifier que l'utilisateur est bien actif

```sql
-- Vérifier que is_active = true
SELECT 
    email,
    is_active,
    role,
    created_at
FROM public.admin_users
WHERE email = 'admin@2kf-securite.fr';
```

## 🔧 Solutions courantes

### Problème : "Email ou mot de passe incorrect"

**Causes possibles** :
1. Le hash du mot de passe n'est pas correct dans la base de données
2. Les variables d'environnement Supabase sont incorrectes
3. RLS bloque l'accès à la table `admin_users`

**Solution** :
1. Vérifiez le hash (étape 1)
2. Vérifiez les variables d'environnement (étape 2)
3. Vérifiez RLS (étape 3)

### Problème : Erreur 500 ou "Une erreur est survenue"

**Causes possibles** :
1. `JWT_SECRET` manquant ou incorrect
2. Connexion Supabase échouée
3. Erreur dans le code

**Solution** :
1. Vérifiez les logs Vercel (étape 5)
2. Vérifiez que `JWT_SECRET` est défini sur Vercel
3. Vérifiez que les clés Supabase sont correctes

### Problème : "Trop de tentatives"

**Cause** : Protection brute-force activée (5 tentatives max)

**Solution** : Attendez 15 minutes ou redémarrez le serveur Vercel

## 📝 Checklist finale

- [ ] Le hash du mot de passe est correct dans Supabase
- [ ] L'utilisateur a `is_active = true`
- [ ] Les variables d'environnement sont correctes sur Vercel
- [ ] Le projet a été redéployé après modification des variables
- [ ] RLS permet l'accès à `admin_users` (ou est désactivé temporairement)
- [ ] Les logs Vercel ne montrent pas d'erreur

## 🆘 Si rien ne fonctionne

1. Créez un nouvel utilisateur admin avec un nouveau mot de passe :

```sql
-- Générer un nouveau hash pour "NouveauMotDePasse123!"
-- Utilisez : node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('NouveauMotDePasse123!', 10).then(h => console.log(h))"

INSERT INTO public.admin_users (email, password_hash, name, role, is_active)
VALUES (
    'admin2@2kf-securite.fr',
    'LE_HASH_GÉNÉRÉ',
    'Admin 2',
    'admin',
    true
);
```

2. Contactez le support avec :
   - Les logs Vercel
   - Le résultat de la requête SQL de vérification
   - L'erreur exacte retournée par l'API

