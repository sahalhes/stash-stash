import { SignedIn } from "@clerk/nextjs";
import Navigation from "@/app/components/Navigation";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <div className="flex min-h-screen">
        {/* Left Sidebar Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <div className="flex-1 ml-16">
          {children}
        </div>
      </div>
    </SignedIn>
  );
}
