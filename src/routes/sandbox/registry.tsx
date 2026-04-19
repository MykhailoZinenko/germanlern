import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import { Badge } from '#/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '#/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '#/components/ui/dialog'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '#/components/ui/drawer'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '#/components/ui/sheet'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from '#/components/ui/popover'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '#/components/ui/select'
import { Checkbox } from '#/components/ui/checkbox'
import { Switch } from '#/components/ui/switch'
import { Avatar, AvatarImage, AvatarFallback } from '#/components/ui/avatar'
import { Skeleton } from '#/components/ui/skeleton'
import { Separator } from '#/components/ui/separator'
import { Progress } from '#/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '#/components/ui/alert'
import { ScrollArea } from '#/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '#/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '#/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '#/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '#/components/ui/pagination'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '#/components/ui/collapsible'
import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '#/components/ui/command'
import { Toaster } from '#/components/ui/sonner'
import { Spinner } from '#/components/ui/spinner'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '#/components/ui/empty'
import { Kbd } from '#/components/ui/kbd'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '#/components/ui/input-otp'
import {
  NativeSelect,
  NativeSelectOption,
} from '#/components/ui/native-select'
import {
  LayoutList,
  LayoutGrid,
  ChevronDown,
  Plus,
  Settings,
  Trash2,
  Copy,
  Search,
  Heart,
  Star,
  BookOpen,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  InboxIcon,
} from 'lucide-react'

export const Route = createFileRoute('/sandbox/registry')({
  component: RegistryPage,
})

const TOC_SECTIONS = [
  { id: 'color-tokens', label: 'Color Tokens' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing-shadows', label: 'Spacing & Shadows' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs-forms', label: 'Inputs & Forms' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'utility', label: 'Utility' },
] as const

const CHIP_PRESETS = [
  { name: 'Gender (der)', label: 'der', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'Gender (die)', label: 'die', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'Gender (das)', label: 'das', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'Word type', label: 'Noun', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'AI tag', label: 'AI Tag', bg: '#e8d8f8', text: '#4a3490', border: '#b898e0' },
  { name: 'User tag', label: 'User Tag', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'Due today', label: 'Due Today', bg: '#f8c8b0', text: '#7a3018', border: '#f0a888' },
  { name: 'Due future', label: 'Due Apr 25', bg: '#fde8d8', text: '#7a5840', border: '#f8d8c4' },
  { name: 'PDF type', label: 'PDF', bg: '#f8c8b0', text: '#7a3018', border: '#f0a888' },
  { name: 'Rich text type', label: 'Rich Text', bg: '#f8e890', text: '#785010', border: '#f0d060' },
  { name: 'Streak', label: '5-day streak', bg: '#f8c8b0', text: '#7a3018', border: '#f0a888' },
  { name: 'Buffer', label: 'Buffer: 3', bg: '#f8c8b0', text: '#7a3018', border: '#f0a888' },
  { name: 'Verified (DWDS)', label: 'DWDS Verified', bg: '#a8c8a0', text: '#204818', border: '#78a870' },
  { name: 'AI-only verified', label: 'AI Verified', bg: '#e8d8f8', text: '#4a3490', border: '#b898e0' },
  { name: 'Unverified', label: 'Unverified', bg: '#f8c8c8', text: '#901818', border: '#e89090' },
] as const

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 font-heading text-2xl font-bold tracking-tight"
    >
      {title}
    </h2>
  )
}

function SectionNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

function SwatchGrid({
  title,
  swatches,
}: {
  title: string
  swatches: Array<{ name: string; value: string }>
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {swatches.map((s) => (
          <div key={s.name} className="flex items-center gap-2 rounded-xl p-2">
            <div
              className="size-8 shrink-0 rounded-lg border border-border"
              style={{ backgroundColor: s.value }}
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RegistryPage() {
  const [otpValue, setOtpValue] = useState('')
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-10">
          <h1 className="font-heading text-4xl font-bold tracking-tight">
            GermanLern Design Registry
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Component and token showcase for the GermanLern design system.
          </p>
        </header>

        {/* Sticky Table of Contents */}
        <nav className="sticky top-0 z-40 -mx-6 mb-10 border-b border-border bg-background/95 px-6 py-3 backdrop-blur-sm">
          <ul className="flex flex-wrap gap-2">
            {TOC_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {/* ─── 1. Color Tokens ─── */}
          <section id="color-tokens" className="space-y-6">
            <SectionHeading id="color-tokens" title="Color Tokens" />
            <SectionNote>
              Design tokens from DD.md mapped to CSS custom properties in
              styles.css.
            </SectionNote>

            <SwatchGrid
              title="Surfaces"
              swatches={[
                { name: '--surface-page', value: '#fef0e8' },
                { name: '--surface-raised', value: '#fff8f4' },
                { name: '--surface-sunken', value: '#fde8d8' },
                { name: '--surface-hover', value: '#fcdcc8' },
                { name: '--surface-active', value: '#f8c8b0' },
              ]}
            />
            <SwatchGrid
              title="Borders"
              swatches={[
                { name: '--border-subtle', value: '#f8d8c4' },
                { name: '--border-medium', value: '#f0c4a8' },
                { name: '--border-strong', value: '#e8a888' },
              ]}
            />
            <SwatchGrid
              title="Text"
              swatches={[
                { name: '--text-primary', value: '#2a1a10' },
                { name: '--text-secondary', value: '#4a3020' },
                { name: '--text-muted', value: '#7a5840' },
                { name: '--text-faint', value: '#a88870' },
                { name: '--text-inverse', value: '#fff8f4' },
              ]}
            />
            <SwatchGrid
              title="Actions (Lumi wisteria)"
              swatches={[
                { name: '--action-bg', value: '#8868c8' },
                { name: '--action-hover', value: '#7858b8' },
                { name: '--action-active', value: '#6848a8' },
                { name: '--action-text', value: '#fff8f4' },
                { name: '--action-destructive', value: '#e05040' },
              ]}
            />
            <SwatchGrid
              title="Lumi (Companion)"
              swatches={[
                { name: '--lumi-lightest', value: '#f5f0fc' },
                { name: '--lumi-light', value: '#e8d8f8' },
                { name: '--lumi-soft', value: '#c8b0e8' },
                { name: '--lumi-mid', value: '#c4aee8' },
                { name: '--lumi-deep', value: '#8868c8' },
                { name: '--lumi-text', value: '#4a3490' },
                { name: '--lumi-border', value: '#b898e0' },
              ]}
            />
            <SwatchGrid
              title="Stages (peach → gold → garden green)"
              swatches={[
                { name: '--stage-planted-bg', value: '#f8c8b0' },
                { name: '--stage-planted-text', value: '#7a3018' },
                { name: '--stage-planted-border', value: '#f0a888' },
                { name: '--stage-planted-dot', value: '#e07848' },
                { name: '--stage-growing-bg', value: '#f8e890' },
                { name: '--stage-growing-text', value: '#785010' },
                { name: '--stage-growing-border', value: '#f0d060' },
                { name: '--stage-growing-dot', value: '#c89820' },
                { name: '--stage-almost-bg', value: '#f0c858' },
                { name: '--stage-almost-text', value: '#703808' },
                { name: '--stage-almost-border', value: '#d8a030' },
                { name: '--stage-almost-dot', value: '#b87818' },
                { name: '--stage-mastered-bg', value: '#a8c8a0' },
                { name: '--stage-mastered-text', value: '#204818' },
                { name: '--stage-mastered-border', value: '#78a870' },
                { name: '--stage-mastered-dot', value: '#4a8840' },
              ]}
            />
            <SwatchGrid
              title="Status"
              swatches={[
                { name: '--status-success-bg', value: '#a8c8a0' },
                { name: '--status-success-text', value: '#204818' },
                { name: '--status-success-border', value: '#78a870' },
                { name: '--status-warning-bg', value: '#f8c8b0' },
                { name: '--status-warning-text', value: '#7a3018' },
                { name: '--status-warning-border', value: '#f0a888' },
                { name: '--status-error-bg', value: '#f8c8c8' },
                { name: '--status-error-text', value: '#901818' },
                { name: '--status-error-border', value: '#e89090' },
                { name: '--status-info-bg', value: '#e8d8f8' },
                { name: '--status-info-text', value: '#4a3490' },
                { name: '--status-info-border', value: '#b898e0' },
                { name: '--status-neutral-bg', value: '#fde8d8' },
                { name: '--status-neutral-text', value: '#7a5840' },
                { name: '--status-neutral-border', value: '#f8d8c4' },
              ]}
            />
          </section>

          {/* ─── 2. Typography ─── */}
          <section id="typography" className="space-y-6">
            <SectionHeading id="typography" title="Typography" />
            <SectionNote>
              Headings use Fraunces (font-heading). Body text uses Inter
              (font-sans).
            </SectionNote>

            <div className="space-y-4 rounded-2xl border border-border p-6">
              <h1 className="font-heading text-4xl font-bold">
                H1 Heading -- Fraunces
              </h1>
              <h2 className="font-heading text-2xl font-bold">
                H2 Heading -- Fraunces
              </h2>
              <h3 className="font-heading text-xl font-medium">
                H3 Heading -- Fraunces
              </h3>
              <h4 className="font-heading text-lg font-medium">
                H4 Heading -- Fraunces
              </h4>
              <Separator />
              <p className="text-base">
                Body text in Inter. The quick brown fox jumps over the lazy dog.
                This sentence showcases the default body text style used
                throughout GermanLern.
              </p>
              <p className="text-sm text-muted-foreground">
                Small / secondary text in Inter at text-sm with muted foreground
                color.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Text color variants</h3>
              <div className="flex flex-wrap gap-4 rounded-2xl border border-border p-6">
                <span style={{ color: '#2a2620' }}>--text-primary</span>
                <span style={{ color: '#4a4540' }}>--text-secondary</span>
                <span style={{ color: '#777068' }}>--text-muted</span>
                <span style={{ color: '#9e9890' }}>--text-faint</span>
                <span
                  className="rounded-lg px-2 py-1"
                  style={{ color: '#fffefb', backgroundColor: '#4a4540' }}
                >
                  --text-inverse
                </span>
              </div>
            </div>
          </section>

          {/* ─── 3. Spacing & Shadows ─── */}
          <section id="spacing-shadows" className="space-y-6">
            <SectionHeading id="spacing-shadows" title="Spacing & Shadows" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Spacing scale</h3>
              <div className="flex flex-wrap items-end gap-3">
                {[
                  { token: '--space-1', px: 4 },
                  { token: '--space-2', px: 8 },
                  { token: '--space-3', px: 12 },
                  { token: '--space-4', px: 16 },
                  { token: '--space-5', px: 20 },
                  { token: '--space-6', px: 24 },
                  { token: '--space-8', px: 32 },
                  { token: '--space-10', px: 40 },
                ].map((s) => (
                  <div key={s.token} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-md bg-primary"
                      style={{ width: s.px, height: s.px }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {s.px}px
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {s.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Shadows</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    name: '--shadow-sm',
                    value: '0 2px 8px rgba(60, 50, 30, 0.08)',
                  },
                  {
                    name: '--shadow-md',
                    value: '0 4px 20px rgba(60, 50, 30, 0.12)',
                  },
                  {
                    name: '--shadow-lg',
                    value: '0 8px 40px rgba(60, 50, 30, 0.16)',
                  },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex h-24 items-center justify-center rounded-2xl bg-card"
                    style={{ boxShadow: s.value }}
                  >
                    <span className="text-xs font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 4. Buttons ─── */}
          <section id="buttons" className="space-y-6">
            <SectionHeading id="buttons" title="Buttons" />
            <SectionNote>
              Used across all pages: primary actions, secondary actions, ghost
              nav items, destructive deletes.
            </SectionNote>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Variants (default size)</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">
                Sizes (default variant)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Icon buttons</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="icon-xs" variant="outline">
                  <Plus />
                </Button>
                <Button size="icon-sm" variant="outline">
                  <Plus />
                </Button>
                <Button size="icon" variant="outline">
                  <Plus />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">With icons</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button>
                  <Plus data-icon="inline-start" />
                  Add Word
                </Button>
                <Button variant="outline">
                  <Settings data-icon="inline-start" />
                  Settings
                </Button>
                <Button variant="destructive">
                  <Trash2 data-icon="inline-start" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Disabled</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled Default</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>
          </section>

          {/* ─── 5. Inputs & Forms ─── */}
          <section id="inputs-forms" className="space-y-6">
            <SectionHeading id="inputs-forms" title="Inputs & Forms" />
            <SectionNote>
              Used in Add Word form, study configuration, document upload, and
              search.
            </SectionNote>

            <div className="grid max-w-lg gap-6">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Label</Label>
                <Input id="demo-input" placeholder="Type something..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-input-disabled">Disabled input</Label>
                <Input
                  id="demo-input-disabled"
                  placeholder="Cannot edit"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea
                  id="demo-textarea"
                  placeholder="Write your notes..."
                />
              </div>

              <div className="space-y-2">
                <Label>Select (Radix)</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a word type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noun">Noun</SelectItem>
                    <SelectItem value="verb">Verb</SelectItem>
                    <SelectItem value="adjective">Adjective</SelectItem>
                    <SelectItem value="adverb">Adverb</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Native Select</Label>
                <NativeSelect>
                  <NativeSelectOption value="">
                    Pick a gender...
                  </NativeSelectOption>
                  <NativeSelectOption value="der">der</NativeSelectOption>
                  <NativeSelectOption value="die">die</NativeSelectOption>
                  <NativeSelectOption value="das">das</NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Checkbox</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="check-1" defaultChecked />
                    <Label htmlFor="check-1">Checked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check-2" />
                    <Label htmlFor="check-2">Unchecked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check-3" disabled />
                    <Label htmlFor="check-3">Disabled</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Switch</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Switch id="switch-on" defaultChecked />
                    <Label htmlFor="switch-on">On</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="switch-off" />
                    <Label htmlFor="switch-off">Off</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Input OTP (6 digits)</h3>
                <SectionNote>
                  Could be used for verification codes or PIN entry.
                </SectionNote>
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </section>

          {/* ─── 6. Overlays ─── */}
          <section id="overlays" className="space-y-6">
            <SectionHeading id="overlays" title="Overlays" />
            <SectionNote>
              Dialog for confirmations, Drawer for mobile actions, Sheet for
              side panels, Popover for contextual info.
            </SectionNote>

            <div className="flex flex-wrap gap-3">
              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Demo Dialog</DialogTitle>
                    <DialogDescription>
                      This is a dialog used for confirmations like deleting a
                      word or resetting study progress.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-sm">
                    Dialog body content goes here. Supports any children.
                  </p>
                  <DialogFooter showCloseButton>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Demo Drawer</DrawerTitle>
                    <DrawerDescription>
                      A bottom drawer for mobile-friendly actions like word
                      quick-add.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p className="text-sm">Drawer content area.</p>
                  </div>
                  <DrawerFooter>
                    <Button>Save</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet (right)</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Demo Sheet</SheetTitle>
                    <SheetDescription>
                      Side panel for filters, word details, or settings.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-6">
                    <p className="text-sm">Sheet content goes here.</p>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>Popover Title</PopoverTitle>
                    <PopoverDescription>
                      Contextual info for word details or hover cards.
                    </PopoverDescription>
                  </PopoverHeader>
                  <p className="text-sm">Additional content here.</p>
                </PopoverContent>
              </Popover>
            </div>
          </section>

          {/* ─── 7. Data Display ─── */}
          <section id="data-display" className="space-y-6">
            <SectionHeading id="data-display" title="Data Display" />

            {/* Card */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Card -- used for word cards, document cards, study session cards
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Wortschatz</CardTitle>
                    <CardDescription>
                      A word card showing German vocabulary entry.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Translation: vocabulary, word stock</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm">Study</Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card size="sm">
                  <CardHeader>
                    <CardTitle>Compact Card</CardTitle>
                    <CardDescription>
                      Smaller variant with reduced padding.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Used for list items or dense layouts.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Badge / Chip Presets */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Badge / Chip presets -- the Chip is the single source for all
                badges, pills, tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {CHIP_PRESETS.map((chip) => (
                  <Badge
                    key={chip.name}
                    variant="outline"
                    style={{
                      backgroundColor: chip.bg,
                      color: chip.text,
                      borderColor: chip.border,
                    }}
                  >
                    {chip.label}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">
                  Standard Badge variants
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Avatar -- used for user profile and companion circle
              </h3>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/9.x/initials/svg?seed=GL"
                    alt="GL"
                  />
                  <AvatarFallback>GL</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Skeleton */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Skeleton -- loading placeholders for cards and lists
              </h3>
              <div className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="mt-2 h-32 w-full" />
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Progress -- study progress, loading states
              </h3>
              <div className="max-w-md space-y-3">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <Progress value={0} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">33%</span>
                  <Progress value={33} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">66%</span>
                  <Progress value={66} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">100%</span>
                  <Progress value={100} />
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Separator -- visual dividers between sections
              </h3>
              <div className="space-y-3">
                <p className="text-sm">Content above horizontal separator</p>
                <Separator />
                <p className="text-sm">Content below horizontal separator</p>
              </div>
              <div className="flex h-8 items-center gap-3">
                <span className="text-sm">Left</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Right</span>
              </div>
            </div>
          </section>

          {/* ─── 8. Navigation ─── */}
          <section id="navigation" className="space-y-6">
            <SectionHeading id="navigation" title="Navigation" />

            {/* Tabs */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Tabs -- study mode selection, add word mode toggle
              </h3>
              <Tabs defaultValue="words">
                <TabsList>
                  <TabsTrigger value="words">Words</TabsTrigger>
                  <TabsTrigger value="study">Study</TabsTrigger>
                  <TabsTrigger value="reading">Reading</TabsTrigger>
                </TabsList>
                <TabsContent value="words" className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Words tab content -- vocabulary list view.
                  </p>
                </TabsContent>
                <TabsContent value="study" className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Study tab content -- spaced repetition session.
                  </p>
                </TabsContent>
                <TabsContent value="reading" className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Reading tab content -- document reader.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Breadcrumb */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Breadcrumb -- page hierarchy navigation
              </h3>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Words</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Detail</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Pagination */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Pagination -- word list pagination, document pages
              </h3>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Dropdown Menu */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Dropdown Menu -- word actions, sort options
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions
                    <ChevronDown data-icon="inline-end" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Word Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Copy />
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star />
                    Favorite
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {/* ─── 9. Feedback ─── */}
          <section id="feedback" className="space-y-6">
            <SectionHeading id="feedback" title="Feedback" />

            {/* Sonner Toasts */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Sonner Toasts -- save confirmations, error notifications
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => toast.success('Word saved successfully')}
                >
                  Success Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error('Failed to save. Please try again.')
                  }
                >
                  Error Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info('Study session starts in 5 minutes')}
                >
                  Info Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.warning('You have 3 words due for review')
                  }
                >
                  Warning Toast
                </Button>
              </div>
            </div>

            {/* Alert */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Alert -- inline feedback for form validation, status messages
              </h3>
              <div className="max-w-lg space-y-3">
                <Alert
                  style={{
                    backgroundColor: '#a8c8a0',
                    borderColor: '#78a870',
                    color: '#204818',
                  }}
                >
                  <CircleCheckIcon />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Word has been verified by DWDS.
                  </AlertDescription>
                </Alert>

                <Alert
                  style={{
                    backgroundColor: '#e8d8f8',
                    borderColor: '#b898e0',
                    color: '#4a3490',
                  }}
                >
                  <InfoIcon />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>
                    AI verification is running in the background.
                  </AlertDescription>
                </Alert>

                <Alert
                  style={{
                    backgroundColor: '#f8c8b0',
                    borderColor: '#f0a888',
                    color: '#7a3018',
                  }}
                >
                  <TriangleAlertIcon />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    You have unreviewed words approaching their due date.
                  </AlertDescription>
                </Alert>

                <Alert
                  style={{
                    backgroundColor: '#f8c8c8',
                    borderColor: '#e89090',
                    color: '#901818',
                  }}
                >
                  <OctagonXIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Could not connect to the dictionary service.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Tooltip */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Tooltip -- hover hints for icons and abbreviated labels
              </h3>
              <TooltipProvider>
                <div className="flex gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Heart />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Add to favorites</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <BookOpen />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Open in reader</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Search />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Search words</span>
                      <Kbd>K</Kbd>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </section>

          {/* ─── 10. Utility ─── */}
          <section id="utility" className="space-y-6">
            <SectionHeading id="utility" title="Utility" />

            {/* ScrollArea */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                ScrollArea -- word list scrolling, document reader
              </h3>
              <ScrollArea className="h-40 w-64 rounded-lg border border-border p-3">
                <div className="space-y-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} className="text-sm">
                      Wort {i + 1}: Beispielwort
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Collapsible */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Collapsible -- expandable filter sections, word detail sections
              </h3>
              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ChevronDown
                      className={`size-4 transition-transform ${isCollapsibleOpen ? 'rotate-180' : ''}`}
                    />
                    Advanced Filters
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="rounded-2xl border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                      Filter by stage, tag, due date, and more. This content is
                      hidden until expanded.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* ToggleGroup */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                ToggleGroup -- list/grid view toggle in word list
              </h3>
              <ToggleGroup type="single" defaultValue="list" variant="outline">
                <ToggleGroupItem value="list" aria-label="List view">
                  <LayoutList />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Command */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Command -- searchable command palette for quick word lookup
              </h3>
              <div className="max-w-sm">
                <Command className="rounded-xl border border-border">
                  <CommandInput placeholder="Search words..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Recent Words">
                      <CommandItem>Wortschatz</CommandItem>
                      <CommandItem>Beispiel</CommandItem>
                      <CommandItem>Bedeutung</CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Actions">
                      <CommandItem>Add new word</CommandItem>
                      <CommandItem>Start study session</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>

            {/* Spinner */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Spinner -- loading indicator for async operations
              </h3>
              <div className="flex items-center gap-3">
                <Spinner />
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            </div>

            {/* Empty */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Empty -- empty state for word list, documents, and search
                results
              </h3>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <InboxIcon />
                  </EmptyMedia>
                  <EmptyTitle>No words yet</EmptyTitle>
                  <EmptyDescription>
                    Add your first German word to get started with your
                    vocabulary journey.
                  </EmptyDescription>
                </EmptyHeader>
                <Button>
                  <Plus data-icon="inline-start" />
                  Add First Word
                </Button>
              </Empty>
            </div>

            {/* Kbd */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Kbd -- keyboard shortcut hints in tooltips and menus
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Kbd>K</Kbd>
                <Kbd>Ctrl</Kbd>
                <Kbd>Enter</Kbd>
                <span className="text-sm text-muted-foreground">
                  Press{' '}
                  <Kbd>Ctrl</Kbd>{' '}
                  +{' '}
                  <Kbd>K</Kbd>{' '}
                  to search
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
