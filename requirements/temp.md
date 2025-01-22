this is my testing 
/webhooks/test
route.ts
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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

/webhooks/clerk

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers');
      return new Response('Error occurred -- no svix headers', {
        status: 400
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occurred', {
        status: 400
      });
    }

    // Handle the webhook
    const eventType = evt.type;
    console.log('Received webhook event:', eventType);

    if (eventType === 'user.created') {
      // Create a new user in Supabase
      const { id, email_addresses, username } = evt.data;
      const primaryEmail = email_addresses[0]?.email_address;

      if (!primaryEmail) {
        console.error('No email address found');
        return new Response('No email address found', { status: 400 });
      }

      console.log('Creating user in Supabase:', { id, email: primaryEmail, username });
      const { error } = await supabase
        .from('users')
        .insert({
          id,
          email: primaryEmail,
          username: username || primaryEmail.split('@')[0],
        });

      if (error) {
        console.error('Error creating user in Supabase:', error);
        return new Response('Error creating user', { status: 500 });
      }

      console.log('User created successfully in Supabase');
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 

/test page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()

  async function runTest() {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setTestResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run test')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Clerk Status</h3>
            <p>User ID: {user?.id || 'Not authenticated'}</p>
          </div>
          
          <Button 
            onClick={runTest} 
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Run Connection Test'}
          </Button>

          {error && (
            <div className="text-red-500">
              Error: {error}
            </div>
          )}

          {testResults && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Environment Variables</h3>
                <pre className="bg-gray-100 p-2 rounded">
                  {JSON.stringify(testResults.environmentVariables, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-medium">Clerk Authentication</h3>
                <pre className="bg-gray-100 p-2 rounded">
                  {JSON.stringify(testResults.clerk, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-medium">Supabase Connection</h3>
                <pre className="bg-gray-100 p-2 rounded">
                  {JSON.stringify(testResults.supabase, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

when i click run connection test i am getting error
Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

also while login etc i can see the webhook clerk logs the session being created but cant see anything on supabase as users. am i missing any step, also help me fix this error 