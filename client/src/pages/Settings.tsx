import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataTable, Column } from "@/components/treasury/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTreasuryStore } from "@/lib/store";
import { TreasuryUser } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Shield, 
  Bell, 
  History,
  Moon,
  Sun
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { users } = useTreasuryStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<TreasuryUser | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as TreasuryUser['role']
  });

  const userColumns: Column<TreasuryUser>[] = [
    {
      key: "name",
      header: "User",
      cell: (user) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">
              {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: "role",
      header: "Role",
      cell: (user) => (
        <span className="text-foreground capitalize">
          {user.role.replace('_', ' ')}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      cell: (user) => (
        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
          {user.status}
        </Badge>
      )
    },
    {
      key: "lastLogin",
      header: "Last Login",
      cell: (user) => (
        <span className="text-sm text-muted-foreground">
          {user.lastLogin ? formatDistanceToNow(user.lastLogin, { addSuffix: true }) : 'Never'}
        </span>
      )
    },
    {
      key: "id",
      header: "Actions",
      className: "text-center",
      cell: (user) => (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditUser(user)}
            data-testid={`button-edit-user-${user.id}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteUser(user.id)}
            className="text-destructive hover:text-destructive/80"
            data-testid={`button-delete-user-${user.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const auditLogs = [
    {
      id: "1",
      timestamp: new Date("2024-01-15T10:30:00Z"),
      user: "John Doe",
      action: "Payment Approved",
      details: "Approved payment PAY-001234 for $50,000 to Acme Corp",
      ipAddress: "192.168.1.100"
    },
    {
      id: "2", 
      timestamp: new Date("2024-01-15T10:15:00Z"),
      user: "Jane Smith",
      action: "User Login",
      details: "Successful login from Chrome browser",
      ipAddress: "192.168.1.101"
    },
    {
      id: "3",
      timestamp: new Date("2024-01-15T09:45:00Z"),
      user: "John Doe",
      action: "Settings Changed",
      details: "Updated notification preferences",
      ipAddress: "192.168.1.100"
    }
  ];

  const handleEditUser = (user: TreasuryUser) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
    });
  };

  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: editingUser ? "User Updated" : "User Created",
      description: `User ${newUser.name} has been ${editingUser ? 'updated' : 'created'} successfully.`,
    });

    setShowUserModal(false);
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "viewer" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Theme Updated",
      description: `Switched to ${!darkMode ? 'dark' : 'light'} mode`,
    });
  };

  return (
    <AppLayout>
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Settings Navigation */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Settings Menu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "users"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-users"
                >
                  <Users className="mr-3 h-4 w-4" />
                  User Management
                </button>
                
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "security"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-security"
                >
                  <Shield className="mr-3 h-4 w-4" />
                  Security
                </button>
                
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "notifications"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-notifications"
                >
                  <Bell className="mr-3 h-4 w-4" />
                  Notifications
                </button>
                
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "audit"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-audit"
                >
                  <History className="mr-3 h-4 w-4" />
                  Audit Log
                </button>
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* User Management */}
            {activeTab === "users" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    User Management
                  </CardTitle>
                  <Button
                    onClick={() => setShowUserModal(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-add-user"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={users}
                    columns={userColumns}
                  />
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Password Policy
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Minimum length: 8 characters</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Require uppercase letters</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Require special characters</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Session Management
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Session timeout: 30 minutes</span>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Force logout on browser close</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Two-Factor Authentication
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Require 2FA for all users</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive email alerts for important events
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Fraud Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Immediate notifications for suspicious activity
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Payment Approvals</div>
                        <div className="text-sm text-muted-foreground">
                          Notifications for pending payment approvals
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">System Maintenance</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts about scheduled maintenance
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Dark Mode</div>
                        <div className="text-sm text-muted-foreground">
                          Switch between light and dark themes
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleDarkMode}
                        data-testid="button-toggle-theme"
                      >
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Audit Log */}
            {activeTab === "audit" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Audit Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {auditLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-start space-x-4 p-4 border border-border rounded-lg"
                          data-testid={`audit-log-${log.id}`}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-foreground">{log.action}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {log.details}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span>User: {log.user}</span>
                              <span>IP: {log.ipAddress}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* User Modal */}
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogContent className="sm:max-w-md" data-testid="modal-user-form">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Add New User"}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Update user information and permissions."
                  : "Create a new user account with appropriate role and permissions."
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name">Full Name *</Label>
                <Input
                  id="user-name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                  data-testid="input-user-name"
                />
              </div>
              
              <div>
                <Label htmlFor="user-email">Email *</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john.doe@company.com"
                  data-testid="input-user-email"
                />
              </div>
              
              <div>
                <Label htmlFor="user-role">Role *</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value: TreasuryUser['role']) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger data-testid="select-user-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="approver">Approver</SelectItem>
                    <SelectItem value="treasury_manager">Treasury Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUserModal(false)}
                data-testid="button-cancel-user"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveUser} data-testid="button-save-user">
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
