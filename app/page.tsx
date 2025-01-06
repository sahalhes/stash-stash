import Navigation from "@/app/components/Navigation";
import HeroSection from "@/app/components/HeroSection";
import ContentSection from "@/app/components/ContentSection";
import SearchBar from "@/app/components/SearchBar";

// This remains a server component
export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 max-w-3xl mx-auto px-8 py-6">
        <SearchBar />
        <HeroSection />
        <ContentSection />
      </main>
      <aside className="w-80 p-6 border-l">
        <div className="sticky top-6">
          <h3 className="font-semibold mb-4">What We're Reading Today</h3>
          {/* Add recommended content here */}
        </div>
      </aside>
    </div>
  );
}