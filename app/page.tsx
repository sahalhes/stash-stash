'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  // ... existing state management code can be removed since we're rebuilding ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Stash Stash
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Store and Share Your Best Ideas
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your thoughts, discover insights, and connect with like-minded people
          </p>
        </div>

        {/* Content Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <Tabs defaultValue="trending">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {/* Placeholder for stash content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="h-40 bg-gray-100 rounded-md mb-4" />
                    <h3 className="font-semibold mb-2">Example Stash Title</h3>
                    <p className="text-sm text-gray-600">
                      A brief preview of the stash content would go here...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Input 
            type="search" 
            placeholder="Search stashes..." 
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;