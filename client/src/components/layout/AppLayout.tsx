import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { BankDetailsDrawer } from "@/components/treasury/BankDetailsDrawer";
import { useTreasuryStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const sidebarCollapsed = useTreasuryStore((state) => state.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main 
          className={cn(
            "flex-1 overflow-hidden transition-all duration-300",
            sidebarCollapsed ? "ml-0" : "ml-64"
          )}
        >
          {children}
        </main>
        <BankDetailsDrawer />
      </div>
    </div>
  );
}
