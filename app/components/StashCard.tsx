import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function StashCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div>
            <Link href="/user/username" className="font-medium">
              Username
            </Link>
            <p className="text-sm text-gray-500">3 min read</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href="/stash/1">
          <h2 className="text-xl font-semibold mb-2">Stash Title</h2>
          <p className="text-gray-600">
            A brief preview of the stash content goes here...
          </p>
        </Link>
      </CardContent>
    </Card>
  );
} 