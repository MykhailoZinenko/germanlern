import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useAddBufferWord } from '#/features/words/api/use-buffer'
import { checkDuplicateWord } from '#/features/words/api/words-server-fns'
import { getDuplicateAction } from '#/features/words/utils/duplicate-check'

export function TabType() {
  const [germanWord, setGermanWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [notes, setNotes] = useState('')
  const [customSentence, setCustomSentence] = useState('')
  const [optionalOpen, setOptionalOpen] = useState(false)
  const [checking, setChecking] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const addMutation = useAddBufferWord()
  const isPending = addMutation.isPending || checking

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const resetForm = () => {
    setGermanWord('')
    setTranslation('')
    setNotes('')
    setCustomSentence('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSubmit = async () => {
    const word = germanWord.trim()
    if (!word) return

    setChecking(true)
    try {
      const result = await checkDuplicateWord({
        data: { germanWord: word, translation: translation.trim() || undefined },
      })

      const action = getDuplicateAction(result)

      if (action === 'skip') {
        const msg = 'inBuffer' in result && result.inBuffer
          ? 'This word is already in your buffer'
          : 'This word is already in your library'
        toast.info(msg)
        return
      }

      if (action === 'add_alt') {
        toast.info('Added as an alternative translation')
      }

      addMutation.mutate(
        {
          germanWord: word,
          translation: translation.trim() || undefined,
          notes: notes.trim() || undefined,
          customSentence: customSentence.trim() || undefined,
        },
        { onSuccess: resetForm },
      )
    } catch {
      addMutation.mutate(
        {
          germanWord: word,
          translation: translation.trim() || undefined,
          notes: notes.trim() || undefined,
          customSentence: customSentence.trim() || undefined,
        },
        { onSuccess: resetForm },
      )
    } finally {
      setChecking(false)
    }
  }

  return (
    /* Fld mb=8→mob 9→8, desk 14→16. Second Fld mb=10→mob 11→12, desk 18→16 */
    <div className="space-y-2 lg:space-y-4">
      {/* Fld: h=38→mob 42→42→h-10, desk 67→68→h-[68px]; r=9→mob 10→var(--radius-lg), desk 16→var(--radius-xl); fs=12→mob 13→text-sm, desk 21→text-lg */}
      <Input
        ref={inputRef}
        placeholder="German word"
        value={germanWord}
        onChange={(e) => setGermanWord(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        className="h-10 rounded-[var(--radius-lg)] text-sm lg:h-[var(--field-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
      />
      <Input
        placeholder="Translation (optional)"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="h-10 rounded-[var(--radius-lg)] text-sm lg:h-[var(--field-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
      />
      {/* collapsible text: fs=10→mob 11→text-xs, desk 18→text-base; mb=12→mob 13→12, desk 21→20 */}
      <Collapsible open={optionalOpen} onOpenChange={setOptionalOpen}>
        <CollapsibleTrigger className="cursor-pointer text-xs text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)] lg:text-sm">
          + notes · + tags · + custom sentence
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
          <Input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-10 rounded-[var(--radius-lg)] text-sm lg:h-[var(--field-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
          />
          <Textarea
            placeholder="Custom sentence"
            value={customSentence}
            onChange={(e) => setCustomSentence(e.target.value)}
            className="min-h-16 resize-none rounded-[var(--radius-lg)] text-sm lg:min-h-20 lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
          />
        </CollapsibleContent>
      </Collapsible>
      {/* Btn: h=34→mob 37→38→h-[var(--btn-h-mobile)], desk 60→h-[60px]; r=9→same as Fld; fs=11→mob 12→text-xs, desk 19→text-lg */}
      <Button
        className="h-[var(--btn-h-mobile)] w-full rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg"
        onClick={handleSubmit}
        disabled={!germanWord.trim() || isPending}
      >
        {isPending ? <Spinner className="size-4 lg:size-5" /> : 'Add word'}
      </Button>
    </div>
  )
}
