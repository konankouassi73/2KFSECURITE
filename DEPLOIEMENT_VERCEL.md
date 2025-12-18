# 🚀 Guide de Déploiement sur Vercel - 2KF SÉCURITÉ

## 📋 Étape 1 : Initialiser Git et pousser sur GitHub

### 1.1 Initialiser Git (si pas déjà fait)

```bash
cd "/Users/arafatetoure/Documents/2KF SECURITE"
git init
```

### 1.2 Créer un fichier .gitignore (déjà présent, vérifiez qu'il contient)

Vérifiez que `.gitignore` contient bien :
- `.env*.local`
- `.env`
- `node_modules/`
- `.next/`

### 1.3 Créer le premier commit

```bash
git add .
git commit -m "Initial commit - Site 2KF SÉCURITÉ"
```

### 1.4 Créer un repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (ou le bouton **+** en haut à droite)
3. Nommez-le : `2kf-securite` (ou un autre nom)
4. **Ne cochez PAS** "Initialize with README"
5. Cliquez sur **"Create repository"**

### 1.5 Connecter et pousser le code

GitHub vous donnera des commandes, utilisez celles-ci :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/2kf-securite.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.**

---

## 📦 Étape 2 : Connecter GitHub à Vercel

### 2.1 Importer le projet

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** → **"Project"**
3. Cliquez sur **"Import Git Repository"**
4. Sélectionnez votre repo GitHub `2kf-securite`
5. Cliquez sur **"Import"**

### 2.2 Configuration du projet

Vercel détectera automatiquement Next.js. Les paramètres par défaut sont bons :

- **Framework Preset** : Next.js
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)

Cliquez sur **"Deploy"** (on configurera les variables d'environnement après)

---

## 🔐 Étape 3 : Configurer les variables d'environnement sur Vercel

### 3.1 Accéder aux paramètres

1. Une fois le déploiement lancé, allez dans **Project Settings**
2. Cliquez sur **"Environment Variables"** dans le menu de gauche

### 3.2 Ajouter les variables

Ajoutez **une par une** ces variables (copiez depuis votre `.env.local`) :

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://votre-projet.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `votre-clé-anon` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `votre-clé-service-role` | Production, Preview, Development |
| `JWT_SECRET` | `votre-secret-jwt` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://2kf-securite.fr` (ou l'URL Vercel temporaire) | Production, Preview, Development |

**⚠️ IMPORTANT** : 
- Cochez **Production**, **Preview** ET **Development** pour chaque variable
- Pour `NEXT_PUBLIC_SITE_URL`, utilisez d'abord l'URL Vercel (ex: `https://2kf-securite.vercel.app`), vous la changerez après avoir connecté votre domaine

### 3.3 Redéployer

1. Allez dans l'onglet **"Deployments"**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Cochez **"Use existing Build Cache"** → **"Redeploy"**

---

## 🌐 Étape 4 : Connecter votre domaine (optionnel mais recommandé)

### 4.1 Ajouter le domaine dans Vercel

1. Allez dans **Project Settings** → **"Domains"**
2. Entrez votre domaine : `2kf-securite.fr`
3. Cliquez sur **"Add"**

### 4.2 Configurer les DNS

Vercel vous donnera des enregistrements DNS à ajouter chez votre registrar :

**Type A** :
```
@ → 76.76.21.21
```

**Type CNAME** :
```
www → cname.vercel-dns.com
```

### 4.3 Mettre à jour NEXT_PUBLIC_SITE_URL

Une fois le domaine configuré et vérifié :
1. Allez dans **Environment Variables**
2. Modifiez `NEXT_PUBLIC_SITE_URL` → `https://2kf-securite.fr`
3. Redéployez

---

## ✅ Étape 5 : Vérifications post-déploiement

### 5.1 Tester le site en production

1. Visitez votre URL Vercel ou votre domaine
2. Vérifiez que le site s'affiche correctement
3. Testez la navigation

### 5.2 Tester le formulaire de contact

1. Allez sur `/contact`
2. Remplissez et soumettez le formulaire
3. Vérifiez dans Supabase que la demande apparaît

### 5.3 Tester l'admin

1. Allez sur `/admin/login`
2. Connectez-vous avec :
   - Email : `admin@2kf-securite.fr`
   - Mot de passe : `Admin2024!`
3. Vérifiez que le dashboard fonctionne

---

## 🔒 Étape 6 : Sécurité post-déploiement

### 6.1 Changer le mot de passe admin

**⚠️ CRITIQUE** : Changez le mot de passe par défaut !

1. Connectez-vous à Supabase
2. Allez dans **SQL Editor**
3. Exécutez ce script (remplacez `NOUVEAU_MOT_DE_PASSE` par votre mot de passe) :

```sql
-- Générer le hash du nouveau mot de passe avec Node.js :
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('VOTRE_MOT_DE_PASSE', 10).then(h => console.log(h))"

UPDATE public.admin_users
SET password_hash = 'LE_HASH_GÉNÉRÉ'
WHERE email = 'admin@2kf-securite.fr';
```

### 6.2 Vérifier HTTPS

Vercel active HTTPS automatiquement. Vérifiez que l'icône de cadenas apparaît dans le navigateur.

---

## 📊 Étape 7 : Analytics (optionnel)

### 7.1 Google Analytics

1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Récupérez le **Measurement ID** (format : `G-XXXXXXXXXX`)
3. Ajoutez dans Vercel : `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
4. Redéployez

---

## 🐛 Dépannage

### Le site ne se déploie pas

- Vérifiez les logs de build dans Vercel
- Assurez-vous que toutes les variables d'environnement sont définies
- Vérifiez que `package.json` contient bien `"build": "next build"`

### Erreur "JWT_SECRET is required"

- Vérifiez que `JWT_SECRET` est bien défini dans Vercel
- Redéployez après avoir ajouté la variable

### Le formulaire ne fonctionne pas

- Vérifiez les clés Supabase dans Vercel
- Vérifiez les logs de l'API dans Vercel (Functions → Logs)
- Testez la connexion Supabase depuis le dashboard Supabase

### L'admin ne fonctionne pas

- Vérifiez que `JWT_SECRET` est identique entre dev et prod
- Vérifiez que la table `admin_users` existe dans Supabase
- Vérifiez les logs de l'API dans Vercel

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez les logs dans Vercel (Deployments → cliquer sur un déploiement)
2. Vérifiez la console du navigateur (F12)
3. Vérifiez les logs Supabase (Logs → API Logs)

---

**Bon déploiement ! 🚀**

