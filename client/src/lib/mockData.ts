import { 
  BankAccount, 
  Transaction, 
  Payment, 
  ForecastScenario, 
  FXExposure, 
  Connector, 
  TreasuryUser, 
  Activity 
} from "@shared/schema";

// Mock Bank Accounts
export const mockBankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountNumber: "••••5678",
    accountType: "operating",
    currency: "USD",
    ledgerBalance: 2458920.50,
    availableBalance: 2358920.50,
    lastUpdated: new Date("2024-01-15T10:30:00Z"),
    status: "active",
    bankColor: "#1f5582",
    bankIcon: "university"
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountNumber: "••••9012",
    accountType: "operating",
    currency: "USD",
    ledgerBalance: 1847650.75,
    availableBalance: 1747650.75,
    lastUpdated: new Date("2024-01-15T10:28:00Z"),
    status: "active",
    bankColor: "#e31837",
    bankIcon: "university"
  },
  {
    id: "3",
    bankName: "Wells Fargo",
    accountNumber: "••••3456",
    accountType: "operating",
    currency: "USD",
    ledgerBalance: 956340.25,
    availableBalance: 856340.25,
    lastUpdated: new Date("2024-01-15T10:25:00Z"),
    status: "active",
    bankColor: "#d71e2b",
    bankIcon: "university"
  },
  {
    id: "4",
    bankName: "HSBC Bank",
    accountNumber: "••••7890",
    accountType: "investment",
    currency: "EUR",
    ledgerBalance: 1234567.00,
    availableBalance: 1134567.00,
    lastUpdated: new Date("2024-01-15T10:20:00Z"),
    status: "active",
    bankColor: "#db0011",
    bankIcon: "university"
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    date: new Date("2024-01-15T09:00:00Z"),
    description: "Wire Transfer In - Acme Corp",
    amount: 50000,
    type: "inflow",
    category: "wire_transfer",
    status: "completed",
    reference: "WT-2024-001"
  },
  {
    id: "2",
    accountId: "1",
    date: new Date("2024-01-14T14:30:00Z"),
    description: "ACH Payment - Supplier Payment",
    amount: -12500,
    type: "outflow",
    category: "ach_payment",
    status: "completed",
    reference: "ACH-2024-087"
  },
  {
    id: "3",
    accountId: "2",
    date: new Date("2024-01-13T11:15:00Z"),
    description: "Deposit - Customer Payment",
    amount: 25000,
    type: "inflow",
    category: "deposit",
    status: "completed",
    reference: "DEP-2024-045"
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "PAY-001234",
    beneficiaryName: "Acme Corporation",
    beneficiaryAccount: "••••9876",
    amount: 50000,
    currency: "USD",
    type: "wire_transfer",
    status: "pending_approval",
    createdBy: "john.doe@company.com",
    createdAt: new Date("2024-01-15T09:00:00Z"),
    fraudAlert: true,
    fraudScore: 75
  },
  {
    id: "PAY-001235",
    beneficiaryName: "Global Supplies Ltd",
    beneficiaryAccount: "••••5432",
    amount: 25000,
    currency: "USD",
    type: "ach",
    status: "approved",
    createdBy: "jane.smith@company.com",
    createdAt: new Date("2024-01-14T14:30:00Z"),
    fraudAlert: false,
    approvedBy: "john.doe@company.com",
    approvedAt: new Date("2024-01-14T16:00:00Z")
  }
];

// Mock Forecast Scenarios
export const mockForecastScenarios: ForecastScenario[] = [
  {
    id: "1",
    name: "Baseline Forecast",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    assumptions: "Conservative growth, stable operations",
    type: "baseline",
    createdBy: "john.doe@company.com",
    createdAt: new Date("2024-01-10T10:00:00Z"),
    data: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(2024, i, 1),
      projectedBalance: 6500000 + (i * 100000),
      inflows: 2400000,
      outflows: 1800000
    }))
  }
];

// Mock FX Exposures
export const mockFXExposures: FXExposure[] = [
  {
    id: "1",
    currencyPair: "USD/EUR",
    exposure: 1200000,
    hedgeRatio: 0.75,
    riskLevel: "medium",
    lastUpdated: new Date("2024-01-15T10:00:00Z")
  },
  {
    id: "2",
    currencyPair: "USD/GBP",
    exposure: 800000,
    hedgeRatio: 0.60,
    riskLevel: "low",
    lastUpdated: new Date("2024-01-15T10:00:00Z")
  }
];

// Mock Connectors
export const mockConnectors: Connector[] = [
  {
    id: "1",
    name: "Chase Bank API",
    type: "bank",
    status: "connected",
    lastSync: new Date("2024-01-15T10:30:00Z"),
    apiKey: "••••••••key123",
    rateLimit: 1000,
    rateLimitUsed: 950
  },
  {
    id: "2",
    name: "SAP ERP",
    type: "erp",
    status: "pending",
    lastSync: undefined,
    apiKey: "••••••••sap456"
  }
];

// Mock Users
export const mockUsers: TreasuryUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "treasury_manager",
    status: "active",
    avatar: "JD",
    lastLogin: new Date("2024-01-15T09:00:00Z")
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "analyst",
    status: "active",
    avatar: "JS",
    lastLogin: new Date("2024-01-14T17:30:00Z")
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "payment_approved",
    title: "Payment Approved",
    description: "Wire transfer to Acme Corp - $50,000",
    timestamp: new Date("2024-01-15T10:28:00Z"),
    userId: "1",
    icon: "check",
    iconColor: "hsl(160, 82%, 36%)"
  },
  {
    id: "2",
    type: "statement_processed",
    title: "Bank Statement Processed",
    description: "Chase Bank - 45 new transactions",
    timestamp: new Date("2024-01-15T10:15:00Z"),
    userId: "2",
    icon: "sync",
    iconColor: "hsl(214, 84%, 42%)"
  },
  {
    id: "3",
    type: "fraud_alert",
    title: "Fraud Alert",
    description: "Suspicious payment flagged for review",
    timestamp: new Date("2024-01-15T09:00:00Z"),
    userId: "1",
    icon: "exclamation-triangle",
    iconColor: "hsl(348, 83%, 47%)"
  },
  {
    id: "4",
    type: "forecast_updated",
    title: "Forecast Updated",
    description: "Q4 cash flow projection completed",
    timestamp: new Date("2024-01-15T07:00:00Z"),
    userId: "1",
    icon: "chart-line",
    iconColor: "hsl(45, 93%, 47%)"
  }
];

// Sparkline data generator
export const generateSparklineData = (length: number = 10): number[] => {
  const data = [];
  let value = Math.random() * 50 + 25;
  
  for (let i = 0; i < length; i++) {
    value += (Math.random() - 0.5) * 10;
    value = Math.max(0, Math.min(100, value));
    data.push(Math.round(value));
  }
  
  return data;
};

// Cash flow chart data generator
export const generateCashFlowData = (months: number = 12) => {
  const labels = [];
  const data = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    
    const baseValue = 5200000 + (i * 150000);
    const variation = (Math.random() - 0.5) * 500000;
    data.push(Math.round(baseValue + variation));
  }
  
  return { labels, data };
};

// Utility functions for data manipulation
export const getTotalCashPosition = (): number => {
  return mockBankAccounts.reduce((total, account) => {
    if (account.currency === 'USD') {
      return total + account.ledgerBalance;
    } else if (account.currency === 'EUR') {
      // Simple EUR to USD conversion for display
      return total + (account.ledgerBalance * 1.08);
    }
    return total;
  }, 0);
};

export const getBalanceDistribution = () => {
  return mockBankAccounts.map(account => ({
    name: account.bankName,
    value: account.currency === 'USD' ? account.ledgerBalance : account.ledgerBalance * 1.08,
    color: account.bankColor || '#8884d8'
  }));
};

export const updateAccountBalance = (accountId: string, newBalance: number) => {
  const account = mockBankAccounts.find(acc => acc.id === accountId);
  if (account) {
    account.ledgerBalance = newBalance;
    account.availableBalance = newBalance - 100000; // 100k hold
    account.lastUpdated = new Date();
  }
};
