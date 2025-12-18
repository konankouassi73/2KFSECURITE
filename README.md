# 2KF SÉCURITÉ - Site Web Professionnel

Site web moderne et professionnel pour 2KF SÉCURITÉ, entreprise de gardiennage et sécurité privée.

## 🚀 Technologies

- **Framework**: Next.js 14 (App Router)
- **Animations 3D**: Three.js / react-three-fiber / @react-three/drei
- **Animations UI**: Framer Motion, GSAP
- **Styles**: Tailwind CSS
- **Validation**: react-hook-form / Zod
- **TypeScript**: Type-safe development

## 📁 Structure du Projet

```
├── app/
│   ├── api/
│   │   └── contact/          # API route pour le formulaire de contact
│   ├── contact/              # Page contact
│   ├── entreprise/           # Page entreprise/valeurs
│   ├── mentions-legales/     # Page mentions légales & RGPD
│   ├── services/             # Page services détaillés
│   ├── layout.tsx            # Layout principal avec métadonnées SEO
│   ├── page.tsx              # Page d'accueil
│   ├── sitemap.ts            # Sitemap XML automatique
│   └── robots.ts             # Robots.txt
├── components/
│   ├── 3d/                   # Composants 3D (Logo, ParticleBackground)
│   ├── contact/              # Formulaire de contact, MapSection
│   ├── home/                 # Sections de la page d'accueil
│   └── layout/               # Navigation, Footer
└── lib/                      # Utilitaires
```

## 🎨 Fonctionnalités

### Pages
- ✅ **Page d'accueil** : Hero avec animations 3D, présentation des services, certifications, CTA
- ✅ **Services** : 6 services détaillés avec animations au scroll
- ✅ **Entreprise** : Présentation, valeurs, timeline animée
- ✅ **Contact** : Formulaire optimisé avec validation, carte Google Maps
- ✅ **Mentions légales** : Conformité RGPD complète

### Animations & Effets
- ✅ Animations 3D avec Three.js (particules, radar, grille de sécurité)
- ✅ Logo animé avec effet de glow
- ✅ Micro-interactions sur les cartes et boutons
- ✅ Transitions fluides entre sections
- ✅ Effet glassmorphism moderne

### SEO & Performance
- ✅ Métadonnées optimisées (OpenGraph, Twitter Cards)
- ✅ Sitemap.xml automatique
- ✅ Robots.txt configuré
- ✅ Lazy loading des composants
- ✅ Optimisation des images

### Sécurité
- ✅ Rate limiting sur le formulaire de contact (5 requêtes / 15 min)
- ✅ Validation des données côté serveur
- ✅ Protection contre les injections
- ✅ Headers sécurisés

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Démarrer le serveur de production
npm start
```

## 📧 Configuration Email

Pour activer l'envoi d'emails depuis le formulaire de contact, configurez un service d'email (Resend, SendGrid, etc.) dans `/app/api/contact/route.ts`.

Exemple avec Resend :
```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
```

Ajoutez votre clé API dans `.env.local` :
```
RESEND_API_KEY=your_api_key_here
```

## 🌐 Variables d'Environnement

Créez un fichier `.env.local` :

```env
# URL de production (pour le sitemap et métadonnées)
NEXT_PUBLIC_SITE_URL=https://2kf-securite.fr

# API Email (optionnel)
RESEND_API_KEY=your_api_key_here
```

## 📝 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.ts` :
- `primary-dark`: #0E1A2B
- `primary-electric`: #1B6DFF
- `neutral-titanium`: #A5A6AA

### Contenu
- Modifiez les textes directement dans les composants
- Les services sont définis dans `/app/services/page.tsx`
- Les valeurs de l'entreprise dans `/app/entreprise/page.tsx`

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres plateformes
Le site est compatible avec toute plateforme supportant Next.js 14.

## 📊 Performance

Objectifs :
- LCP < 2.5s
- Score Lighthouse > 90
- Optimisation des animations 3D (lazy load)

## 🔒 Sécurité

- Rate limiting sur les formulaires
- Validation stricte des données
- Protection CSRF
- Headers de sécurité

## 📄 Licence

Propriété de 2KF SÉCURITÉ - Tous droits réservés

## 📞 Support

Pour toute question technique, contactez l'équipe de développement.

---

**Dernière mise à jour** : 2024



