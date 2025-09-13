import { z } from "zod";

// Bank Account Schema
export const bankAccountSchema = z.object({
  id: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  accountType: z.enum(['operating', 'savings', 'investment']),
  currency: z.string(),
  ledgerBalance: z.number(),
  availableBalance: z.number(),
  lastUpdated: z.date(),
  status: z.enum(['active', 'inactive', 'pending']),
  bankColor: z.string().optional(),
  bankIcon: z.string().optional(),
});

// Transaction Schema
export const transactionSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  date: z.date(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(['inflow', 'outflow']),
  category: z.enum(['wire_transfer', 'ach_payment', 'deposit', 'withdrawal', 'fee']),
  status: z.enum(['completed', 'pending', 'failed']),
  reference: z.string().optional(),
});

// Payment Schema
export const paymentSchema = z.object({
  id: z.string(),
  beneficiaryName: z.string(),
  beneficiaryAccount: z.string(),
  amount: z.number(),
  currency: z.string(),
  type: z.enum(['wire_transfer', 'ach', 'check']),
  status: z.enum(['draft', 'pending_approval', 'approved', 'sent', 'blocked']),
  createdBy: z.string(),
  createdAt: z.date(),
  fraudAlert: z.boolean().default(false),
  fraudScore: z.number().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.date().optional(),
});

// Cash Forecast Schema
export const forecastScenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  assumptions: z.string(),
  type: z.enum(['baseline', 'optimistic', 'conservative', 'custom']),
  createdBy: z.string(),
  createdAt: z.date(),
  data: z.array(z.object({
    date: z.date(),
    projectedBalance: z.number(),
    inflows: z.number(),
    outflows: z.number(),
  })),
});

// FX Exposure Schema
export const fxExposureSchema = z.object({
  id: z.string(),
  currencyPair: z.string(),
  exposure: z.number(),
  hedgeRatio: z.number(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  lastUpdated: z.date(),
});

// Connector Schema
export const connectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['bank', 'erp', 'accounting']),
  status: z.enum(['connected', 'pending', 'error', 'inactive']),
  lastSync: z.date().optional(),
  apiKey: z.string().optional(),
  rateLimit: z.number().optional(),
  rateLimitUsed: z.number().optional(),
});

// User Schema
export const treasuryUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['treasury_manager', 'analyst', 'approver', 'viewer']),
  status: z.enum(['active', 'inactive', 'pending']),
  avatar: z.string().optional(),
  lastLogin: z.date().optional(),
});

// Activity Schema
export const activitySchema = z.object({
  id: z.string(),
  type: z.enum(['payment_approved', 'statement_processed', 'fraud_alert', 'forecast_updated', 'user_login']),
  title: z.string(),
  description: z.string(),
  timestamp: z.date(),
  userId: z.string(),
  icon: z.string(),
  iconColor: z.string(),
});

// Export types
export type BankAccount = z.infer<typeof bankAccountSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type ForecastScenario = z.infer<typeof forecastScenarioSchema>;
export type FXExposure = z.infer<typeof fxExposureSchema>;
export type Connector = z.infer<typeof connectorSchema>;
export type TreasuryUser = z.infer<typeof treasuryUserSchema>;
export type Activity = z.infer<typeof activitySchema>;

// Insert schemas
export const insertBankAccountSchema = bankAccountSchema.omit({ id: true, lastUpdated: true });
export const insertTransactionSchema = transactionSchema.omit({ id: true });
export const insertPaymentSchema = paymentSchema.omit({ id: true, createdAt: true });
export const insertForecastScenarioSchema = forecastScenarioSchema.omit({ id: true, createdAt: true });
export const insertFXExposureSchema = fxExposureSchema.omit({ id: true, lastUpdated: true });
export const insertConnectorSchema = connectorSchema.omit({ id: true });
export const insertTreasuryUserSchema = treasuryUserSchema.omit({ id: true });
export const insertActivitySchema = activitySchema.omit({ id: true });

// Export insert types
export type InsertBankAccount = z.infer<typeof insertBankAccountSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertForecastScenario = z.infer<typeof insertForecastScenarioSchema>;
export type InsertFXExposure = z.infer<typeof insertFXExposureSchema>;
export type InsertConnector = z.infer<typeof insertConnectorSchema>;
export type InsertTreasuryUser = z.infer<typeof insertTreasuryUserSchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
