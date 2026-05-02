import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'
import type { Database } from '#/types/database'

type TagRow = Database['public']['Tables']['user_tags']['Row']

export const fetchUserTags = createServerFn({ method: 'GET' }).handler(
  async (): Promise<TagRow[]> => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('user_tags')
      .select('*')
      .eq('user_id', user.id)
      .order('name')

    if (error) throw new Error(error.message)
    return data
  },
)

export const createTag = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { name: string })
  .handler(async (ctx) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: tag, error } = await supabase
      .from('user_tags')
      .insert({ user_id: user.id, name: ctx.data.name.trim() })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return tag
  })
