import { useMemo, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useAddBufferWordsBatch } from '#/features/words/api/use-buffer'

export function TabPaste() {
  const [text, setText] = useState('')
  const batchMutation = useAddBufferWordsBatch()

  const words = useMemo(
    () =>
      text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    [text],
  )

  const handleSubmit = () => {
    if (words.length === 0) return
    batchMutation.mutate(words, {
      onSuccess: () => setText(''),
    })
  }

  return (
    <div className="space-y-2 lg:space-y-4">
      {/* instruction: fs=10→mob 11→text-xs, desk 18→text-sm */}
      <p className="text-xs text-[var(--text-muted)] lg:text-sm">One word per line</p>
      {/* textarea: h=100→mob 110→h-[110px], desk 176→h-[176px]; r=9→same as Fld; fs=12→mob 13→text-sm, desk 21→text-lg; lineHeight=1.9 */}
      <Textarea
        placeholder={'Hund\nKatze\nStraße'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-[var(--aw-textarea-h)] resize-none rounded-[var(--radius-lg)] text-sm leading-relaxed lg:h-[var(--aw-textarea-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
      />
      {/* Btn: same sizes as tab-type */}
      <Button
        className="h-[var(--btn-h-mobile)] w-full rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg"
        onClick={handleSubmit}
        disabled={words.length === 0 || batchMutation.isPending}
      >
        {batchMutation.isPending ? (
          <Spinner className="size-4 lg:size-5" />
        ) : words.length === 0 ? (
          'Paste words above'
        ) : (
          `Add ${words.length} word${words.length !== 1 ? 's' : ''} to buffer`
        )}
      </Button>
    </div>
  )
}
