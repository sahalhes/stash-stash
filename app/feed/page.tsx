import { SignedIn } from "@clerk/nextjs";
import { Search } from "lucide-react";
import FeedTabs from "@/app/components/FeedTabs";
import StashCard from "@/app/components/StashCard";

export default function FeedPage() {
  return (
    <div className="flex">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Keep up with the latest in any topic"
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Feed Content */}
        <FeedTabs />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-6 border-l min-h-screen">
        <div className="sticky top-6 space-y-8">
          <div>
            <h3 className="font-semibold mb-4">What We're Reading Today</h3>
            <div className="space-y-4">
              {/* Reading recommendations */}
              <StashCard
                title="Your portfolio is stopping you from getting that job"
                author="Amit Das"
                timeAgo="4 days ago"
              />
              {/* Add more recommendations */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Recommended Topics</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Technology",
                "Money",
                "Business",
                "Productivity",
                "Art",
                "Mindfulness"
              ].map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
