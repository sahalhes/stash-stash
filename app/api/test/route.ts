import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Check if user exists in Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    return NextResponse.json({
      status: 'success',
      clerk: {
        userId,
      },
      supabase: {
        user,
        userError,
        webhookSecret: !!process.env.CLERK_WEBHOOK_SECRET,
      },
      env: {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        clerkKey: !!process.env.CLERK_SECRET_KEY,
        webhookSecret: !!process.env.CLERK_WEBHOOK_SECRET
      }
    })
  } catch (error) {
    console.error('Test failed:', error)
    return NextResponse.json({ error: 'Test failed' }, { status: 500 })
  }
}