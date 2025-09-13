import { create } from 'zustand';
import { 
  BankAccount, 
  Transaction, 
  Payment, 
  ForecastScenario, 
  FXExposure, 
  Connector, 
  TreasuryUser, 
  Activity 
} from '@shared/schema';
import {
  mockBankAccounts,
  mockTransactions,
  mockPayments,
  mockForecastScenarios,
  mockFXExposures,
  mockConnectors,
  mockUsers,
  mockActivities
} from './mockData';

interface TreasuryStore {
  // Data
  bankAccounts: BankAccount[];
  transactions: Transaction[];
  payments: Payment[];
  forecastScenarios: ForecastScenario[];
  fxExposures: FXExposure[];
  connectors: Connector[];
  users: TreasuryUser[];
  activities: Activity[];
  
  // UI State
  selectedBankAccount: BankAccount | null;
  selectedPayment: Payment | null;
  sidebarCollapsed: boolean;
  
  // Actions
  setBankAccounts: (accounts: BankAccount[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setPayments: (payments: Payment[]) => void;
  setForecastScenarios: (scenarios: ForecastScenario[]) => void;
  setFXExposures: (exposures: FXExposure[]) => void;
  setConnectors: (connectors: Connector[]) => void;
  setUsers: (users: TreasuryUser[]) => void;
  setActivities: (activities: Activity[]) => void;
  
  selectBankAccount: (account: BankAccount | null) => void;
  selectPayment: (payment: Payment | null) => void;
  toggleSidebar: () => void;
  
  // Business Logic
  approvePayment: (paymentId: string) => void;
  rejectPayment: (paymentId: string) => void;
  updateBankBalance: (accountId: string, newBalance: number) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
}

export const useTreasuryStore = create<TreasuryStore>((set, get) => ({
  // Initial Data
  bankAccounts: mockBankAccounts,
  transactions: mockTransactions,
  payments: mockPayments,
  forecastScenarios: mockForecastScenarios,
  fxExposures: mockFXExposures,
  connectors: mockConnectors,
  users: mockUsers,
  activities: mockActivities,
  
  // Initial UI State
  selectedBankAccount: null,
  selectedPayment: null,
  sidebarCollapsed: false,
  
  // Setters
  setBankAccounts: (accounts) => set({ bankAccounts: accounts }),
  setTransactions: (transactions) => set({ transactions }),
  setPayments: (payments) => set({ payments }),
  setForecastScenarios: (scenarios) => set({ forecastScenarios: scenarios }),
  setFXExposures: (exposures) => set({ fxExposures: exposures }),
  setConnectors: (connectors) => set({ connectors }),
  setUsers: (users) => set({ users }),
  setActivities: (activities) => set({ activities }),
  
  // UI Actions
  selectBankAccount: (account) => set({ selectedBankAccount: account }),
  selectPayment: (payment) => set({ selectedPayment: payment }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  // Business Logic
  approvePayment: (paymentId) => {
    const { payments, addActivity } = get();
    const updatedPayments = payments.map(payment => {
      if (payment.id === paymentId) {
        const approved = {
          ...payment,
          status: 'approved' as const,
          approvedBy: 'john.doe@company.com',
          approvedAt: new Date(),
          fraudAlert: false
        };
        
        addActivity({
          type: 'payment_approved',
          title: 'Payment Approved',
          description: `${payment.beneficiaryName} - $${payment.amount.toLocaleString()}`,
          timestamp: new Date(),
          userId: '1',
          icon: 'check',
          iconColor: 'hsl(160, 82%, 36%)'
        });
        
        return approved;
      }
      return payment;
    });
    
    set({ payments: updatedPayments });
  },
  
  rejectPayment: (paymentId) => {
    const { payments, addActivity } = get();
    const updatedPayments = payments.map(payment => {
      if (payment.id === paymentId) {
        const rejected = { ...payment, status: 'blocked' as const };
        
        addActivity({
          type: 'fraud_alert',
          title: 'Payment Blocked',
          description: `${payment.beneficiaryName} - $${payment.amount.toLocaleString()}`,
          timestamp: new Date(),
          userId: '1',
          icon: 'ban',
          iconColor: 'hsl(348, 83%, 47%)'
        });
        
        return rejected;
      }
      return payment;
    });
    
    set({ payments: updatedPayments });
  },
  
  updateBankBalance: (accountId, newBalance) => {
    const { bankAccounts } = get();
    const updatedAccounts = bankAccounts.map(account => {
      if (account.id === accountId) {
        return {
          ...account,
          ledgerBalance: newBalance,
          availableBalance: newBalance - 100000,
          lastUpdated: new Date()
        };
      }
      return account;
    });
    
    set({ bankAccounts: updatedAccounts });
  },
  
  addActivity: (activity) => {
    const { activities } = get();
    const newActivity = {
      ...activity,
      id: `activity-${Date.now()}`
    };
    
    set({ activities: [newActivity, ...activities].slice(0, 20) }); // Keep only latest 20
  }
}));
