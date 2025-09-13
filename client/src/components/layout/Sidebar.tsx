import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard,
  Wallet,
  TrendingUp,
  CreditCard,
  Shield,
  Link as LinkIcon,
  Settings,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTreasuryStore } from "@/lib/store";

const navigationItems = [
  {
    section: "Main",
    items: [
      { href: "/", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/cash-position", icon: Wallet, label: "Cash Position" },
      { href: "/forecasting", icon: TrendingUp, label: "Cash Forecasting" },
      { href: "/payments", icon: CreditCard, label: "Payments" },
    ]
  },
  {
    section: "Management",
    items: [
      { href: "/risk", icon: Shield, label: "Risk Management" },
      { href: "/connectivity", icon: LinkIcon, label: "Connectivity" },
    ]
  },
  {
    section: "System",
    items: [
      { href: "/settings", icon: Settings, label: "Settings" },
      { href: "/support", icon: HelpCircle, label: "Support" },
    ]
  }
];

export function Sidebar() {
  const [location] = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useTreasuryStore();

  return (
    <>
      {/* Mobile backdrop */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside 
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
        data-testid="sidebar"
      >
        <nav className="h-full overflow-y-auto py-6">
          <div className="px-6 space-y-8">
            {navigationItems.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                    
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                        data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
