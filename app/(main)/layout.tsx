import Navigation from "@/app/components/Navigation";
import SearchBar from "@/app/components/SearchBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 ml-16">
        <div className="max-w-4xl mx-auto px-4">
          <SearchBar />
          {children}
        </div>
      </main>
    </div>
  );
} 