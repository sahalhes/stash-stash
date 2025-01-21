import { supabase } from './supabase'
import { Database } from '@/types/supabase'

type Stash = Database['public']['Tables']['stashes']['Row']
type NewStash = Database['public']['Tables']['stashes']['Insert']

interface StashCreate {
  title: string;
  content: string;
  is_public: boolean;
}

export async function createStash(data: StashCreate) {
  try {
    const response = await fetch('/api/stashes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Log the response status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    // If not JSON, log the text content
    if (!response.headers.get('content-type')?.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || 'Failed to create stash');
    }

    return json;
  } catch (error) {
    console.error('Create stash error:', error);
    throw error;
  }
}

export async function getStashes(userId?: string) {
  console.log('API: Getting stashes for user:', userId);
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

  if (error) {
    console.error('API: Error getting stashes:', error);
    throw new Error(error.message);
  }

  console.log('API: Got stashes:', data);
  return data;
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

export async function getStashesByTag(tagName: string) {
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
        id
      ),
      stash_tags!inner (
        tags!inner (
          name
        )
      )
    `)
    .eq('stash_tags.tags.name', tagName)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addTagToStash(stashId: string, tagName: string) {
  // First, get or create the tag
  const { data: tag, error: tagError } = await supabase
    .from('tags')
    .upsert({ name: tagName })
    .select()
    .single()

  if (tagError) throw tagError

  // Then, create the stash-tag association
  const { error } = await supabase
    .from('stash_tags')
    .upsert({ 
      stash_id: stashId, 
      tag_id: tag.id 
    })

  if (error) throw error
}

export async function removeTagFromStash(stashId: string, tagName: string) {
  const { data: tag, error: tagError } = await supabase
    .from('tags')
    .select()
    .eq('name', tagName)
    .single()

  if (tagError) throw tagError

  const { error } = await supabase
    .from('stash_tags')
    .delete()
    .eq('stash_id', stashId)
    .eq('tag_id', tag.id)

  if (error) throw error
}

export async function shareStash(stashId: string, sharedWithUserId: string) {
  const { error } = await supabase
    .from('shared_stashes')
    .upsert({ 
      stash_id: stashId, 
      shared_with_user_id: sharedWithUserId 
    })

  if (error) throw error
}

export async function unshareStash(stashId: string, sharedWithUserId: string) {
  const { error } = await supabase
    .from('shared_stashes')
    .delete()
    .eq('stash_id', stashId)
    .eq('shared_with_user_id', sharedWithUserId)

  if (error) throw error
}

export async function getSharedStashes(userId: string) {
  const { data, error } = await supabase
    .from('shared_stashes')
    .select(`
      stashes (
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
      )
    `)
    .eq('shared_with_user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data?.map(item => item.stashes) || []
}

export async function searchStashes(query: string) {
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
        id
      ),
      stash_tags (
        tags (
          name
        )
      )
    `)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
} 