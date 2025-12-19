/**
 * Normalise une URL en ajoutant le protocole https:// si manquant
 * @param url - URL à normaliser (peut être undefined)
 * @returns URL normalisée avec protocole
 */
export function normalizeUrl(url: string | undefined): string {
  if (!url) return 'https://2kfsecurite.fr'
  // Si l'URL commence déjà par http:// ou https://, on la retourne telle quelle
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Sinon, on ajoute https://
  return `https://${url}`
}

