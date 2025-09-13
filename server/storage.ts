import { type TreasuryUser, type InsertTreasuryUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<TreasuryUser | undefined>;
  getUserByUsername(username: string): Promise<TreasuryUser | undefined>;
  createUser(user: InsertTreasuryUser): Promise<TreasuryUser>;
}

export class MemStorage implements IStorage {
  private users: Map<string, TreasuryUser>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<TreasuryUser | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<TreasuryUser | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === username,
    );
  }

  async createUser(insertUser: InsertTreasuryUser): Promise<TreasuryUser> {
    const id = randomUUID();
    const user: TreasuryUser = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
