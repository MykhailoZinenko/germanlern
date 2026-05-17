import { createFileRoute } from '@tanstack/react-router'

import { StudyConfigure } from '#/features/study/components/study-configure'

export const Route = createFileRoute('/_protected/study/')({
  component: StudyConfigurePage,
})

function StudyConfigurePage() {
  return (
    <div className="flex flex-1 items-start justify-center px-[var(--shell-page-pad-x-mobile)] py-5 lg:items-center lg:px-[var(--shell-page-pad-x)] lg:py-8">
      <StudyConfigure />
    </div>
  )
}
