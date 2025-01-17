'use client';

import { useState } from 'react';
import StashCard from './StashCard';

export default function FeedTabs() {
  const [activeTab, setActiveTab] = useState('recommended');

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
        {/* Feed items */}
        <StashCard
          title="Your portfolio is stopping you from getting that job"
          author="Amit Das"
          timeAgo="4 days ago"
          description="An intense way to learn about the process and practice your designs skills – My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer."
          category="Portfolio"
          readTime="3 min read"
          tag="Selected for you"
          image="/images/portfolio.jpg"
        />
        {/* Add more cards */}
      </div>
    </div>
  );
} 