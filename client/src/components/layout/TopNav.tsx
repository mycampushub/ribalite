import { Menu, Search, Bell, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTreasuryStore } from "@/lib/store";
import { SearchInput } from "@/components/treasury/SearchInput";

export function TopNav() {
  const toggleSidebar = useTreasuryStore((state) => state.toggleSidebar);

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 relative z-50">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="md:hidden text-foreground hover:text-primary"
          data-testid="button-sidebar-toggle"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Coins className="text-primary-foreground h-4 w-4" />
          </div>
          <h1 className="text-xl font-bold text-foreground">TreasuryPro</h1>
        </div>
        
        <nav className="hidden md:flex text-sm text-muted-foreground" aria-label="Breadcrumb">
          <span>Dashboard</span>
          <span className="mx-2">•</span>
          <span className="text-foreground">Overview</span>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchInput className="hidden md:block" />
        
        <Button
          variant="ghost"
          size="sm"
          className="relative text-muted-foreground hover:text-foreground"
          data-testid="button-notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">Treasury Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
