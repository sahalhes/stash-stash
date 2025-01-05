'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeedTabs() {
  return (
    <Tabs defaultValue="recommended" className="w-full">
      <TabsList>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="recommended">Recommended</TabsTrigger>
      </TabsList>
    </Tabs>
  );
} 