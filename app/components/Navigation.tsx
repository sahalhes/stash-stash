'use client';

import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import Logo from './Logo';
import { Home, Bell, Bookmark, Edit } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed h-screen w-16 flex flex-col items-center py-8 border-r bg-white">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>

      <div className="flex flex-col items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-black">
          <Home className="w-6 h-6" />
        </Link>
        <Link href="/notifications" className="text-gray-700 hover:text-black">
          <Bell className="w-6 h-6" />
        </Link>
        <Link href="/bookmarks" className="text-gray-700 hover:text-black">
          <Bookmark className="w-6 h-6" />
        </Link>
        <Link href="/write" className="text-gray-700 hover:text-black">
          <Edit className="w-6 h-6" />
        </Link>
      </div>

      <div className="mt-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
} 