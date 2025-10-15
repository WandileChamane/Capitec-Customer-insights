import { Request, Response } from "express";
import * as data from "../services/dataService";

export const getProfile = (req: Request, res: Response) => {
  const { customerId } = req.params;
  const profile = data.getCustomerProfile(customerId);
  if (!profile) return res.status(404).json({ message: "Customer not found" });
  return res.json(profile);
};

export const getTransactions = (req: Request, res: Response) => {
  const { customerId } = req.params;
  const { from, to, category, q, limit, offset, sort, period } = req.query;
  let params: any = {};
  if (from) params.from = String(from);
  if (to) params.to = String(to);
  if (category) params.category = String(category);
  if (q) params.q = String(q);
  if (limit) params.limit = Number(limit);
  if (offset) params.offset = Number(offset);
  if (sort) params.sort = String(sort) as any;
  if (period) params.period = String(period);
  const result = data.queryTransactions(customerId, params);
  return res.json(result);
};

export const getSummary = (req: Request, res: Response) => {
  const { customerId } = req.params;
  const { period } = req.query;
  const summary = data.getSummary(customerId, typeof period === "string" ? period : undefined);
  return res.json(summary);
};

export const getCategories = (req: Request, res: Response) => {
  return res.json(data.listCategories());
};

export const getGoals = (req: Request, res: Response) => {
  const { customerId } = req.params;
  return res.json(data.listGoals(customerId));
};

export const postGoal = (req: Request, res: Response) => {
  const { customerId } = req.params;
  const body = req.body;
  if (!body || !body.name || typeof body.targetAmount !== "number" || !body.period) {
    return res.status(400).json({ message: "Invalid payload: name, targetAmount (number) and period required" });
  }
  const g = data.upsertGoal(customerId, body);
  return res.status(201).json(g);
};
