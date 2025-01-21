'use client';

import { useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle } from 'lucide-react';
import { toggleLike } from '@/lib/api';
import Link from 'next/link';

interface StashCardProps {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  description?: string;
  authorImage?: string | null;
  likesCount: number;
  commentsCount: number;
  currentUserId?: string;
}

export default function StashCard({
  id,
  title,
  author,
  timeAgo,
  description,
  authorImage,
  likesCount: initialLikesCount,
  commentsCount,
  currentUserId
}: StashCardProps) {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiking, setIsLiking] = useState(false);

  async function handleLike() {
    if (!currentUserId || isLiking) return;

    try {
      setIsLiking(true);
      const isLiked = await toggleLike(id, currentUserId);
      setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  }

  return (
    <article className="flex justify-between items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
            {authorImage && (
              <img 
                src={authorImage} 
                alt={author} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="text-sm font-medium">{author}</span>
          <span className="text-sm text-gray-500">· {timeAgo}</span>
        </div>
        
        <Link href={`/stash/${id}`}>
          <h3 className="font-semibold mb-1 hover:text-blue-600 cursor-pointer">
            {title}
          </h3>
        </Link>
        
        {description && (
          <p className="text-gray-600 text-sm mb-2">{description}</p>
        )}

        <div className="flex items-center gap-4 mt-3">
          <button 
            onClick={handleLike}
            disabled={!currentUserId || isLiking}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{likesCount}</span>
          </button>

          <Link href={`/stash/${id}`} className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{commentsCount}</span>
          </Link>
        </div>
      </div>

      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>
    </article>
  );
} 