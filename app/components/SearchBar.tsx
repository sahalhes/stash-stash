'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { searchStashes } from '@/lib/api';
import StashCard from './StashCard';
import { useUser } from '@clerk/nextjs';
import { Database } from '@/types/supabase';

type Stash = Database['public']['Tables']['stashes']['Row'] & {
  users: {
    username: string;
    profile_image_url: string | null;
  };
  likes: { user_id: string }[];
  comments: { id: string }[];
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<Stash[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const data = await searchStashes(debouncedQuery);
        setResults(data as Stash[]);
      } catch (error) {
        console.error('Error searching stashes:', error);
      } finally {
        setIsSearching(false);
      }
    }

    performSearch();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keep up with the latest in any topic"
          className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Search Results */}
      {(isSearching || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-[80vh] overflow-y-auto z-50">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            <div className="divide-y">
              {results.map((stash) => (
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 