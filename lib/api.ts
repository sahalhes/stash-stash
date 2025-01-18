import { supabase } from './supabase'
import { Database } from '@/types/supabase'

type Stash = Database['public']['Tables']['stashes']['Row']
type NewStash = Database['public']['Tables']['stashes']['Insert']

export async function createStash(stash: NewStash) {
  const { data, error } = await supabase
    .from('stashes')
    .insert(stash)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getStashes(userId?: string) {
  let query = supabase
    .from('stashes')
    .select(`
      *,
      users (
        username,
        profile_image_url
      ),
      likes (
        user_id
      ),
      comments (
        id
      )
    `)
    .order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  } else {
    query = query.eq('is_public', true)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getStashById(id: string) {
  const { data, error } = await supabase
    .from('stashes')
    .select(`
      *,
      users (
        username,
        profile_image_url
      ),
      likes (
        user_id
      ),
      comments (
        id,
        content,
        created_at,
        users (
          username,
          profile_image_url
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateStash(id: string, updates: Partial<Stash>) {
  const { data, error } = await supabase
    .from('stashes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteStash(id: string) {
  const { error } = await supabase
    .from('stashes')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleLike(stashId: string, userId: string) {
  const { data: existingLike } = await supabase
    .from('likes')
    .select()
    .eq('stash_id', stashId)
    .eq('user_id', userId)
    .single()

  if (existingLike) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('stash_id', stashId)
      .eq('user_id', userId)

    if (error) throw error
    return false
  } else {
    const { error } = await supabase
      .from('likes')
      .insert({ stash_id: stashId, user_id: userId })

    if (error) throw error
    return true
  }
} 