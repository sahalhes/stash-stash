import { Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SavedPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Saved Stashes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder saved stashes - replace with real data */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-2">
                How to implement authentication in Next.js
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="text-sm text-gray-500">2 days ago</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">5 min read</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3">
                Learn how to implement authentication in your Next.js application using
                various providers and best practices for secure user management.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-sm text-gray-600">John Doe</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 