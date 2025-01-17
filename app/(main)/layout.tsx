import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Navigation from "@/app/components/Navigation";
import Logo from "@/app/components/Logo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-black">Idea Categories</a>
              <a href="#" className="text-gray-600 hover:text-black">Collections</a>
              <a href="#" className="text-gray-600 hover:text-black">Get Pro</a>
            </nav>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
                Log In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </SignedIn>
        </div>
      </header>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 