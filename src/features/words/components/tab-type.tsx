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
    <div className="flex flex-col gap-3">
      <Input
        ref={inputRef}
        placeholder="German word"
        value={germanWord}
        onChange={(e) => setGermanWord(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] text-base"
      />
      <Input
        placeholder="Translation (optional)"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] text-base"
      />
      <Collapsible open={optionalOpen} onOpenChange={setOptionalOpen}>
        <CollapsibleTrigger className="cursor-pointer py-1 text-[11px] text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]">
          + notes · + custom sentence
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 flex flex-col gap-3">
          <Input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] text-base"
          />
          <Textarea
            placeholder="Custom sentence"
            value={customSentence}
            onChange={(e) => setCustomSentence(e.target.value)}
            className="min-h-16 resize-none rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] text-base"
          />
        </CollapsibleContent>
      </Collapsible>
      <Button
        className="h-10 w-full text-sm font-medium"
        onClick={handleSubmit}
        disabled={!germanWord.trim() || isPending}
      >
        {isPending ? <Spinner className="size-4" /> : 'Add word'}
      </Button>
    </div>
  )
}
