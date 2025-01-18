import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>

      <div className="space-y-4">
        {/* Placeholder notifications - replace with real data */}
        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">John Doe</span> liked your stash
              </p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Jane Smith</span> commented on your stash
              </p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 