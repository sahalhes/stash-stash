'use client';

import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createStash } from '@/lib/api';
import { toast } from 'sonner';

export default function WritePage() {
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  async function handleSave() {
    if (!user?.id) {
      toast.error('You must be logged in to create a stash');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    try {
      setIsSaving(true);
      
      const stash = await createStash({
        title: title.trim(),
        content: content.trim(),
        is_public: isPublic
      });

      toast.success('Stash saved successfully!');
      
      // Clear the form
      setTitle('');
      setContent('');
      setIsPublic(false);
      
      // Navigate to feed
      router.push('/feed');
      router.refresh();
    } catch (error) {
      console.error('Error saving stash:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save stash');
    } finally {
      setIsSaving(false);
    }
  }

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
          <Button 
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            placeholder="Enter your title"
            className="text-2xl font-semibold border-none px-0 focus-visible:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="prose prose-sm max-w-none">
          <Textarea
            placeholder="Write your content here..."
            className="min-h-[500px] resize-none border-none px-0 focus-visible:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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