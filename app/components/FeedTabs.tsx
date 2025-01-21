'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import StashCard from './StashCard';
import { getStashes } from '@/lib/api';
import { Database } from '@/types/supabase';

type Stash = Database['public']['Tables']['stashes']['Row'] & {
  users: {
    username: string;
    profile_image_url: string | null;
  };
  likes: { user_id: string }[];
  comments: { id: string }[];
};

export default function FeedTabs() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchStashes() {
      try {
        setIsLoading(true);
        const data = await getStashes(activeTab === 'following' ? user?.id : undefined);
        setStashes(data as Stash[]);
      } catch (error) {
        console.error('Error fetching stashes:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStashes();
  }, [activeTab, user?.id]);

  return (
    <div>
      <div className="flex gap-6 mb-6 border-b">
        <button
          onClick={() => setActiveTab('following')}
          className={`pb-4 px-2 ${
            activeTab === 'following'
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-500'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`pb-4 px-2 ${
            activeTab === 'recommended'
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-500'
          }`}
        >
          Recommended
        </button>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : stashes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {activeTab === 'following' 
              ? "You're not following anyone yet"
              : "No stashes found"}
          </div>
        ) : (
          stashes.map((stash) => (
            <StashCard
              key={stash.id}
              id={stash.id}
              title={stash.title}
              author={stash.users.username}
              timeAgo={new Date(stash.created_at).toLocaleDateString()}
              description={stash.content}
              likesCount={stash.likes.length}
              commentsCount={stash.comments.length}
              authorImage={stash.users.profile_image_url}
              currentUserId={user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
} 