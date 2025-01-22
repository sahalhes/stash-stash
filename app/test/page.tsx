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