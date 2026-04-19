export function CompanionMini() {
  return (
    <div
      id="companion-area"
      className="fixed bottom-20 right-4 z-40 flex size-20 items-center justify-center rounded-full border-2 border-[var(--lumi-border)] bg-[var(--lumi-light)] shadow-[var(--shadow-sm)] md:bottom-6 md:right-6"
    >
      <span className="text-2xl">✨</span>
      <span className="absolute right-1 top-1 size-2.5 animate-pulse rounded-full bg-[var(--stage-mastered-dot)]" />
    </div>
  )
}
