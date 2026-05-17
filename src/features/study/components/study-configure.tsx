import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { buildStudyQueue, type QueueWord } from '#/lib/sm2'
import { fetchStudyQueue } from '#/features/study/api/study-server-fns'
import { useStudyStore } from '#/store/study-store'

import { StudyBookmarkTabs, type StudyTab } from './study-bookmark-tabs'
import { TabAuto } from './tab-auto'
import { TabByTag } from './tab-by-tag'
import { TabAskCompanion } from './tab-ask-companion'

export function StudyConfigure() {
  const [activeTab, setActiveTab] = useState<StudyTab>('auto')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [companionPrompt, setCompanionPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setSession = useStudyStore((s) => s.startSession)

  function handleToggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  async function handleStart(mode: 'auto' | 'by_tag') {
    setIsLoading(true)
    try {
      const words = await fetchStudyQueue({
        data: {
          mode,
          tagFilter: mode === 'by_tag' ? selectedTags : undefined,
        },
      })

      const queue = buildStudyQueue(
        words.map((w) => ({
          id: w.id,
          german_word: w.german_word,
          word_type: w.word_type,
          easiness_factor: w.easiness_factor ?? 2.5,
          interval_days: w.interval_days ?? 0,
          review_count: w.review_count ?? 0,
          next_review_date: w.next_review_date,
          last_reviewed: w.last_reviewed,
        })) as QueueWord[]
      )

      if (queue.length === 0) return

      setSession({
        mode,
        tagFilter: mode === 'by_tag' ? selectedTags : undefined,
        words,
        queue: queue.map((q) => q.id),
      })

      navigate({ to: '/study/session' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[var(--study-configure-max-w)]">
      <h2 className="text-base font-medium text-[var(--text-primary)] lg:text-lg">
        What do you want to study?
      </h2>
      <p className="mb-4 mt-1 text-xs text-[var(--text-muted)] lg:mb-5">
        Choose a mode to begin
      </p>

      <StudyBookmarkTabs active={activeTab} onChange={setActiveTab} />

      <div className="rounded-b-[var(--radius-lg)] rounded-tr-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4 lg:p-5">
        {activeTab === 'auto' && (
          <TabAuto onStart={() => handleStart('auto')} isLoading={isLoading} />
        )}
        {activeTab === 'by_tag' && (
          <TabByTag
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
            onStart={() => handleStart('by_tag')}
            isLoading={isLoading}
          />
        )}
        {activeTab === 'ask_companion' && (
          <TabAskCompanion
            prompt={companionPrompt}
            onPromptChange={setCompanionPrompt}
          />
        )}
      </div>
    </div>
  )
}
