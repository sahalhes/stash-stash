'use client';

import Link from 'next/link';
import { Home, Bell, Bookmark, Edit, Search } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <nav className="fixed left-0 h-screen w-16 flex flex-col items-center py-8 border-r">
      <div className="flex flex-col space-y-8">
        <Link href="/">
          <div className="text-2xl font-bold">S</div>
        </Link>
        
        <Link href="/">
          <Home className="w-6 h-6" />
        </Link>
        
        <Link href="/notifications">
          <Bell className="w-6 h-6" />
        </Link>
        
        <Link href="/bookmarks">
          <Bookmark className="w-6 h-6" />
        </Link>
        
        <Link href="/new">
          <Edit className="w-6 h-6" />
        </Link>
      </div>
      
      <div className="mt-auto">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </nav>
  );
} 