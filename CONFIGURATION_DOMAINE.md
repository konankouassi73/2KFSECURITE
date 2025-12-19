# 🌐 Configuration du Domaine 2kfsecurite.fr sur Vercel

## 📋 Étapes pour connecter votre domaine

### 1. Configurer le domaine sur Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Sélectionnez votre projet **2KFSECURITE**
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **"Add Domain"**
5. Entrez votre domaine : `2kfsecurite.fr`
6. Cliquez sur **"Add"**

### 2. Configurer les DNS chez votre registrar

Vercel vous donnera des enregistrements DNS à configurer. Vous devez les ajouter chez votre registrar (là où vous avez acheté le domaine).

#### Option A : Configuration avec sous-domaines (recommandé)

Ajoutez ces enregistrements DNS :

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | Auto |
| CNAME | www | `cname.vercel-dns.com` | Auto |

**Note** : Les valeurs exactes seront affichées par Vercel. Utilisez celles qu'ils vous donnent.

#### Option B : Configuration avec CNAME (si votre registrar le supporte)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | `cname.vercel-dns.com` | Auto |
| CNAME | www | `cname.vercel-dns.com` | Auto |

### 3. Vérifier la propagation DNS

Après avoir configuré les DNS, attendez 5-30 minutes pour la propagation. Vous pouvez vérifier avec :

- [whatsmydns.net](https://www.whatsmydns.net/#A/2kfsecurite.fr)
- [dnschecker.org](https://dnschecker.org/#A/2kfsecurite.fr)

### 4. Activer HTTPS sur Vercel

1. Une fois les DNS propagés, Vercel détectera automatiquement le domaine
2. Vercel générera automatiquement un certificat SSL (Let's Encrypt)
3. HTTPS sera activé automatiquement (cela peut prendre quelques minutes)

### 5. Mettre à jour les variables d'environnement

1. Allez dans **Settings** → **Environment Variables**
2. Modifiez `NEXT_PUBLIC_SITE_URL` :
   - Ancienne valeur : `https://2kfsecurite.vercel.app`
   - Nouvelle valeur : `https://2kfsecurite.fr`
3. Cochez **Production**, **Preview** ET **Development**
4. Cliquez sur **"Save"**
5. **Redéployez** le projet (Deployments → 3 points → Redeploy)

### 6. Vérifier que tout fonctionne

1. Testez l'accès au site : `https://2kfsecurite.fr`
2. Vérifiez que HTTPS est actif (cadenas vert dans le navigateur)
3. Testez le formulaire de contact
4. Testez l'accès admin : `https://2kfsecurite.fr/admin`

## 🔧 Résolution de problèmes

### Le domaine ne se connecte pas

- Vérifiez que les DNS sont correctement configurés
- Attendez 24-48h maximum pour la propagation complète
- Vérifiez que vous avez utilisé les bonnes valeurs DNS de Vercel

### HTTPS ne fonctionne pas

- Attendez 5-10 minutes après la connexion du domaine
- Vérifiez que les DNS pointent bien vers Vercel
- Contactez le support Vercel si le problème persiste après 24h

### Erreur "Domain not found"

- Vérifiez l'orthographe du domaine dans Vercel
- Assurez-vous que les DNS sont bien configurés
- Vérifiez que le domaine est bien enregistré et actif

## 📝 Notes importantes

- **Ne supprimez pas** l'ancien domaine Vercel (`2kfsecurite.vercel.app`) - il continuera de fonctionner
- Le domaine personnalisé peut prendre jusqu'à 48h pour être complètement opérationnel
- Vercel gère automatiquement le renouvellement des certificats SSL

## ✅ Checklist finale

- [ ] Domaine ajouté sur Vercel
- [ ] DNS configurés chez le registrar
- [ ] Propagation DNS vérifiée
- [ ] HTTPS activé (cadenas vert)
- [ ] Variable `NEXT_PUBLIC_SITE_URL` mise à jour
- [ ] Projet redéployé
- [ ] Site accessible sur `https://2kfsecurite.fr`
- [ ] Formulaire de contact fonctionne
- [ ] Admin accessible sur `https://2kfsecurite.fr/admin`

