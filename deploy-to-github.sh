#!/bin/bash

# =============================================
# Script de déploiement GitHub - 2KF SÉCURITÉ
# =============================================

echo "🚀 Déploiement sur GitHub..."
echo ""

# Aller dans le répertoire du projet
cd "/Users/arafatetoure/Documents/2KF SECURITE"

# Vérifier si Git est déjà initialisé
if [ -d ".git" ]; then
    echo "✅ Git est déjà initialisé"
else
    echo "📦 Initialisation de Git..."
    git init
fi

# Vérifier si le remote existe déjà
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' existe déjà"
    echo "   URL actuelle: $(git remote get-url origin)"
    read -p "Voulez-vous le remplacer ? (o/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        git remote remove origin
        git remote add origin https://github.com/konankouassi73/2KFSECURITE.git
        echo "✅ Remote mis à jour"
    fi
else
    echo "🔗 Ajout du remote GitHub..."
    git remote add origin https://github.com/konankouassi73/2KFSECURITE.git
    echo "✅ Remote ajouté"
fi

# Vérifier le statut
echo ""
echo "📊 Statut Git:"
git status --short

echo ""
read -p "Voulez-vous continuer avec le commit et le push ? (o/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "❌ Annulé"
    exit 1
fi

# Ajouter tous les fichiers
echo ""
echo "📝 Ajout des fichiers..."
git add .

# Créer le commit
echo "💾 Création du commit..."
git commit -m "Initial commit - Site 2KF SÉCURITÉ avec backend admin"

# Renommer la branche en main
echo "🌿 Configuration de la branche main..."
git branch -M main

# Push vers GitHub
echo ""
echo "⬆️  Envoi vers GitHub..."
git push -u origin main

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Allez sur https://vercel.com"
echo "   2. Importez votre repo GitHub"
echo "   3. Configurez les variables d'environnement"
echo ""

