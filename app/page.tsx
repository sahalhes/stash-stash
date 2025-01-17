import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SignedOut>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              BECOME<br />
              THE SMARTEST<br />
              IN THE ROOM
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Unlimited access to 200,000+ powerful ideas from top<br />
              books, podcasts, and more.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-lg font-medium">
                Get Started
              </button>
            </SignInButton>
          </div>

          {/* Onboarding Questions */}
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-xl font-semibold mb-6">What brings you to Stash Stash?</h2>
            <div className="space-y-4">
              {[
                "Increase Productivity",
                "Win at Work",
                "Build Better Habits",
                "Earn More Money"
              ].map((option) => (
                <button
                  key={option}
                  className="w-full p-4 text-left border rounded-lg hover:border-black transition-colors flex justify-between items-center group"
                >
                  {option}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Featured Collections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Marketing with Seth Godin",
                image: "/collections/marketing.jpg",
                color: "bg-yellow-100"
              },
              {
                title: "Stoic Life",
                image: "/collections/stoic.jpg",
                color: "bg-blue-100"
              },
              {
                title: "Learn to Invest",
                image: "/collections/invest.jpg",
                color: "bg-green-100"
              },
              {
                title: "Inside the Mind of Elon Musk",
                image: "/collections/elon.jpg",
                color: "bg-purple-100"
              }
            ].map((collection) => (
              <div
                key={collection.title}
                className={`${collection.color} rounded-2xl p-6 aspect-square flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <h3 className="text-xl font-semibold">{collection.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Personalized Feed will go here */}
        </div>
      </SignedIn>
    </div>
  );
}