type DuplicateResult =
  | { exists: false }
  | { exists: true; inBuffer: true }
  | {
      exists: true
      existingWord: { id: string; german_word: string; translation: string | null }
      sameTranslation: boolean
    }

export type DuplicateAction = 'skip' | 'add_alt' | 'proceed'

export function getDuplicateAction(result: DuplicateResult): DuplicateAction {
  if (!result.exists) return 'proceed'
  if ('inBuffer' in result) return 'skip'
  if (result.sameTranslation) return 'skip'
  return 'add_alt'
}
