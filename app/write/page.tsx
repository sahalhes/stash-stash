'use client';

import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function WritePage() {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Edit className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Write a Stash</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public">Make Public</Label>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            placeholder="Enter your title"
            className="text-2xl font-semibold border-none px-0 focus-visible:ring-0"
          />
        </div>

        <div className="prose prose-sm max-w-none">
          <Textarea
            placeholder="Write your content here..."
            className="min-h-[500px] resize-none border-none px-0 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-4 border-t pt-4">
          <Button variant="outline">Add Tags</Button>
          <Button variant="outline">Add Cover Image</Button>
        </div>
      </div>
    </div>
  );
} 