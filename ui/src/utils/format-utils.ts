import { LANGUAGE_NAMES } from '@/data/languageNames'

export function formatAuthorName(firstName: string | null, lastName: string): string {
  if (firstName) {
    return `${firstName} ${lastName}`
  }
  return lastName
}

export function formatAuthorLifespan(birthYear: string | null, deathYear: string | null): string {
  if (birthYear && deathYear) {
    return `${birthYear} - ${deathYear}`
  }
  if (birthYear) {
    return `${birthYear} -`
  }
  if (deathYear) {
    return `- ${deathYear}`
  }
  return ''
}

export function formatDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`
  }
  return downloads.toString()
}

export function getPopularityStars(popularity: number): string {
  const clamped = Math.max(0, Math.min(5, Math.floor(popularity)))
  return '★'.repeat(clamped) + '☆'.repeat(5 - clamped)
}

export function getLanguageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? code
}

export function formatLanguages(languages: string[]): string {
  return languages.map(getLanguageName).join(', ')
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural || `${singular}s`
}

export function extractUniqueValues<T>(items: T[], getter: (item: T) => string[]): string[] {
  const values = new Set<string>()
  items.forEach((item) => {
    getter(item).forEach((value) => values.add(value))
  })
  return Array.from(values).sort()
}

export function normalizeImagePath(path: string): string {
  return path.startsWith('./') ? path : `./${path}`
}
