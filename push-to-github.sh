#!/bin/bash

# Script pour pousser vers GitHub avec token

echo "🚀 Push vers GitHub - 2KF SÉCURITÉ"
echo ""
echo "📋 Instructions:"
echo "1. Si vous n'avez pas encore de Personal Access Token, créez-en un:"
echo "   https://github.com/settings/tokens"
echo "   → Generate new token (classic)"
echo "   → Nom: '2KF SECURITE'"
echo "   → Scope: cochez 'repo'"
echo "   → Generate token"
echo ""
read -p "Avez-vous un Personal Access Token ? (o/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "❌ Créez d'abord un token sur GitHub, puis relancez ce script"
    exit 1
fi

echo ""
read -sp "Collez votre Personal Access Token: " TOKEN
echo ""

# Nettoyer le token (supprimer les espaces)
TOKEN=$(echo "$TOKEN" | tr -d '[:space:]')

if [ -z "$TOKEN" ]; then
    echo "❌ Token vide, annulation"
    exit 1
fi

# Vérifier la longueur du token (un token GitHub fait généralement 40+ caractères)
if [ ${#TOKEN} -lt 20 ]; then
    echo "⚠️  Le token semble trop court. Vérifiez que vous avez bien copié tout le token."
    read -p "Continuer quand même ? (o/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Oo]$ ]]; then
        exit 1
    fi
fi

# Modifier l'URL pour inclure le token (échapper les caractères spéciaux)
cd "/Users/arafatetoure/Documents/2KF SECURITE"

# Utiliser printf pour échapper correctement l'URL
REMOTE_URL=$(printf "https://konankouassi73:%s@github.com/konankouassi73/2KFSECURITE.git" "$TOKEN")
git remote set-url origin "$REMOTE_URL"

echo ""
echo "⬆️  Envoi vers GitHub..."
if git push -u origin main; then
    echo "✅ Push réussi !"
    # Retirer le token de l'URL pour sécurité
    git remote set-url origin https://github.com/konankouassi73/2KFSECURITE.git
    echo "🔒 Token retiré de l'URL pour sécurité"
else
    echo "❌ Erreur lors du push"
    echo "💡 Vérifiez que :"
    echo "   - Le token est valide et n'a pas expiré"
    echo "   - Le token a la scope 'repo'"
    echo "   - Le repository existe sur GitHub"
    # Retirer le token même en cas d'erreur
    git remote set-url origin https://github.com/konankouassi73/2KFSECURITE.git
    exit 1
fi

echo ""
echo "✅ Terminé !"

