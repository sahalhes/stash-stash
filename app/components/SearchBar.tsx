'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Keep up with the latest in any topic"
        className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  );
} 