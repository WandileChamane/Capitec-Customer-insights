import { Transaction, CustomerProfile } from "../types";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import seedData from "../../seed-data.json";
import { parsePeriod } from "../utils/date";

const transactions: Transaction[] = (seedData && (seedData as any).transactions) || [];
const customers = (seedData && (seedData as any).customers) || [
  {
    customerId: "cust_001",
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2023-01-15",
    accountType: "premium",
    currency: "ZAR"
  }
];

export const listCategories = () => (seedData && (seedData as any).categories) || [];

export const getCustomerProfile = (customerId: string): CustomerProfile | null => {
  const customer = customers.find((c: any) => c.customerId === customerId);
  if (!customer) return null;
  const totalSpent = transactions.filter(t => t.customerId === customerId).reduce((s,t)=> s + t.amount, 0);
  return {
    ...customer,
    totalSpent: Number(totalSpent.toFixed(2))
  };
};

export type TxQuery = {
  from?: string;
  to?: string;
  category?: string;
  q?: string;
  limit?: number;
  offset?: number;
  sort?: "date_desc" | "date_asc" | "amount_desc" | "amount_asc";
};

export const queryTransactions = (customerId: string, q: TxQuery) => {
  let data = transactions.filter(t => t.customerId === customerId);
  if (q.from) data = data.filter(t => dayjs(t.date).isAfter(dayjs(q.from).subtract(1, "day")));
  if (q.to) data = data.filter(t => dayjs(t.date).isBefore(dayjs(q.to).add(1, "day")));
  if (q.category) data = data.filter(t => t.category === q.category);
  if (q.q) {
    const ql = q.q.toLowerCase();
    data = data.filter(t => t.merchant.toLowerCase().includes(ql) || (t.notes && t.notes.toLowerCase().includes(ql)));
  }
  switch (q.sort) {
    case "date_asc":
      data = data.sort((a,b)=> dayjs(a.date).valueOf()-dayjs(b.date).valueOf());
      break;
    case "amount_asc":
      data = data.sort((a,b)=> a.amount - b.amount);
      break;
    case "amount_desc":
      data = data.sort((a,b)=> b.amount - a.amount);
      break;
    default:
      data = data.sort((a,b)=> dayjs(b.date).valueOf()-dayjs(a.date).valueOf());
  }
  const total = data.length;
  const offset = q.offset ?? 0;
  const limit = q.limit ?? 100;
  const page = data.slice(offset, offset + limit);
  return { total, offset, limit, data: page };
};

export const getSummary = (customerId: string, period?: string) => {
  const periodRange = parsePeriod(period);
  let data = transactions.filter(t => t.customerId === customerId);
  if (periodRange) {
    data = data.filter(t => dayjs(t.date).isAfter(periodRange.from) && dayjs(t.date).isBefore(periodRange.to));
  }
  const total = Number(data.reduce((s,t)=> s + t.amount, 0).toFixed(2));
  const avg = data.length ? Number((total / data.length).toFixed(2)) : 0;
  const months = new Map<string, number>();
  for (let i = 0; i < 12; i++) {
    months.set(dayjs().subtract(i, "month").format("YYYY-MM"), 0);
  }
  data.forEach(t => {
    const m = dayjs(t.date).format("YYYY-MM");
    months.set(m, (months.get(m) || 0) + t.amount);
  });
  const monthly = Array.from(months.entries()).map(([month, value]) => ({ month, total: Number(value.toFixed(2)) })).reverse();
  const catMap = new Map<string, number>();
  data.forEach(t => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
  const topCategories = Array.from(catMap.entries())
    .map(([name, total]) => ({ name, total: Number(total.toFixed(2)) }))
    .sort((a,b)=> b.total - a.total)
    .slice(0, 5);
  return { total, avg, monthly, topCategories, transactionCount: data.length };
};

type Goal = {
  id: string;
  customerId: string;
  name: string;
  targetAmount: number;
  period: string;
  progress: number;
};

const goals: Goal[] = [
  { id: uuid(), customerId: "cust_001", name: "Groceries budget", targetAmount: 3000, period: "monthly", progress: 45 }
];

export const listGoals = (customerId: string) => goals.filter(g => g.customerId === customerId);

export const upsertGoal = (customerId: string, payload: Omit<Goal, "id" | "customerId" | "progress"> & Partial<Pick<Goal,"progress">>) => {
  const found = goals.find(g => g.customerId === customerId && g.name === payload.name);
  if (found) {
    found.targetAmount = payload.targetAmount;
    found.period = payload.period;
    if (typeof payload.progress === "number") found.progress = payload.progress;
    return found;
  }
  const g = { id: uuid(), customerId, name: payload.name, targetAmount: payload.targetAmount, period: payload.period, progress: payload.progress ?? 0 };
  goals.push(g);
  return g;
};
