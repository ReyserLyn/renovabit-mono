import Navbar from "@/features/layout/components/navbar";
import { SidebarProvider } from "@/features/layout/components/sidebar-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <SidebarProvider>
        <Navbar />
        {children}
      </SidebarProvider>
    </div>
  );
}
