import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="p-5 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
