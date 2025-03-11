import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";
export default function CategoryLayout({ children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="w-full ">{children}</div>
    </SidebarProvider>
  );
}
