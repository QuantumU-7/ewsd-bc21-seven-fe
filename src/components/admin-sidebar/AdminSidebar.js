import { Button } from "../ui/button";

export const AdminSidebar = () => (
  <div className="w-64 bg-gray-200 p-4 min-h-screen">
    <nav className="space-y-2">
      <Button variant="ghost" className="w-full justify-start">
        Dashboard
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        Categories
      </Button>
      <div className="mt-4 border-t pt-2">
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Sign Out
        </Button>
      </div>
    </nav>
  </div>
);
