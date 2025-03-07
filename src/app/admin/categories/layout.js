import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";
import { CategoryProvider } from "@/providers/CategoryContext";

export default function CategoryLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CategoryProvider>
        <AdminSidebar />
        <div className="w-full p-6">{children}</div>
      </CategoryProvider>
    </div>
  );
}
