import FeedTabs from "@/app/components/FeedTabs";
import StashCard from "@/app/components/StashCard";

export default function Home() {
  return (
    <div className="py-8">
      <FeedTabs />
      <div className="mt-8 space-y-8">
        <StashCard />
        <StashCard />
        <StashCard />
      </div>
    </div>
  );
} 