import Navigation from "@/app/components/Navigation";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-16">{children}</main>
    </div>
  );
} 