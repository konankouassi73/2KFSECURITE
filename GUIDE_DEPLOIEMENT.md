# 🚀 Guide de Déploiement - 2KF SÉCURITÉ

## 📋 Checklist de Pré-déploiement

### ✅ 1. Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# URL de production (obligatoire)
NEXT_PUBLIC_SITE_URL=https://2kf-securite.fr

# Service d'email (obligatoire pour le formulaire)
# Option 1 : Resend (recommandé - gratuit jusqu'à 3000 emails/mois)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 2 : SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

**Comment obtenir une clé Resend :**
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Allez dans "API Keys" et créez une nouvelle clé
4. Copiez la clé dans `.env.local`

### ✅ 2. Activer l'Envoi d'Emails

Le formulaire de contact nécessite une configuration email. Modifiez `/app/api/contact/route.ts` :

**Avec Resend (recommandé) :**

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Dans la fonction POST, remplacez le TODO par :
await resend.emails.send({
  from: 'contact@2kf-securite.fr', // Votre domaine vérifié
  to: '2kfsecurite@gmail.com',
  subject: `Nouvelle demande de contact - ${sanitizedData.serviceType}`,
  html: `
    <h2>Nouvelle demande de contact</h2>
    <p><strong>Nom:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Téléphone:</strong> ${sanitizedData.phone}</p>
    <p><strong>Entreprise:</strong> ${sanitizedData.company || 'Non renseigné'}</p>
    <p><strong>Type de service:</strong> ${sanitizedData.serviceType}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>Source: ${sanitizedData.source}</small></p>
    <p><small>Date: ${sanitizedData.timestamp}</small></p>
  `,
})
```

**Important :** Installez le package Resend :
```bash
npm install resend
```

### ✅ 3. Mettre à Jour la Carte Google Maps

Dans `/components/contact/MapSection.tsx`, remplacez l'URL de la carte par celle de votre adresse :

1. Allez sur [Google Maps](https://www.google.com/maps)
2. Recherchez votre adresse : "229 Rue Saint-Honoré, 75001 Paris"
3. Cliquez sur "Partager" > "Intégrer une carte"
4. Copiez l'URL de l'iframe
5. Remplacez dans `MapSection.tsx`

### ✅ 4. Ajouter les Images Réelles

Remplacez les placeholders par vos images :

- Logo de l'entreprise (si vous en avez un)
- Photos d'équipe/interventions
- Images pour les services

Placez-les dans `/public/images/` et mettez à jour les références dans les composants.

### ✅ 5. Finaliser le Contenu

Vérifiez et ajustez :
- Textes des services dans `/app/services/page.tsx`
- Présentation de l'entreprise dans `/app/entreprise/page.tsx`
- Coordonnées dans `/components/layout/Footer.tsx` et `/app/contact/page.tsx`

## 🚀 Déploiement sur Vercel (Recommandé)

### Option 1 : Déploiement via GitHub

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-username/2kf-securite.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre compte GitHub
   - Cliquez sur "New Project"
   - Importez votre repository
   - Configurez les variables d'environnement :
     - `NEXT_PUBLIC_SITE_URL` = votre URL Vercel
     - `RESEND_API_KEY` = votre clé Resend

3. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez la fin du déploiement
   - Votre site est en ligne !

### Option 2 : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🔧 Configuration Post-Déploiement

### 1. Mettre à Jour l'URL dans les Variables d'Environnement

Une fois déployé, Vercel vous donnera une URL (ex: `https://2kf-securite.vercel.app`). 

Mettez à jour `NEXT_PUBLIC_SITE_URL` dans les paramètres Vercel avec votre domaine final si vous en avez un.

### 2. Configurer un Domaine Personnalisé (Optionnel)

1. Dans Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine (ex: `2kf-securite.fr`)
3. Suivez les instructions pour configurer les DNS

### 3. Vérifier le Formulaire de Contact

1. Testez le formulaire sur le site en production
2. Vérifiez que vous recevez bien les emails
3. Testez le rate limiting (essayez d'envoyer 6 messages rapidement)

## 📊 Optimisation des Performances

### Vérifier avec Lighthouse

1. Ouvrez Chrome DevTools
2. Onglet "Lighthouse"
3. Lancez l'audit
4. Objectif : Score > 90

### Optimisations à faire si nécessaire :

- **Images** : Utilisez le format WebP, optimisez la taille
- **Animations 3D** : Désactivez sur mobile si trop lourd
- **Fonts** : Utilisez `next/font` pour optimiser le chargement

## 🐛 Dépannage

### Le formulaire ne fonctionne pas
- Vérifiez que `RESEND_API_KEY` est bien configuré
- Vérifiez les logs Vercel pour les erreurs
- Assurez-vous que le package `resend` est installé

### Les animations 3D ne s'affichent pas
- Vérifiez la console du navigateur
- Certains navigateurs peuvent bloquer WebGL
- Testez sur Chrome/Firefox

### Erreur 429 (Rate Limit)
- C'est normal, le rate limiting fonctionne
- Attendez 15 minutes avant de réessayer

## 📞 Support

Pour toute question technique, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Resend](https://resend.com/docs)

---

**Bon déploiement ! 🎉**



