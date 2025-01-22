import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const stashSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  is_public: z.boolean().default(false)
})

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get request data
    const data = await request.json()

    // Ensure user exists in Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    if (!existingUser) {
      // Get Clerk user data
      const clerkUser = await currentUser()
      if (!clerkUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      
      // Create user in Supabase
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
          profile_image_url: clerkUser.imageUrl
        })

      if (userError) {
        return Response.json(
          { error: 'Failed to create user' },
          { status: 500 }
        )
      }
    }

    // Create stash
    const { data: stash, error: stashError } = await supabase
      .from('stashes')
      .insert({
        user_id: userId,
        title: data.title,
        content: data.content,
        is_public: data.is_public
      })
      .select()
      .single()

    if (stashError) {
      return Response.json(
        { error: stashError.message },
        { status: 400 }
      )
    }

    return Response.json({ success: true, data: stash })

  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 