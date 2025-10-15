"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertGoal = exports.listGoals = exports.getSummary = exports.queryTransactions = exports.getCustomerProfile = exports.listCategories = void 0;
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
const seed_data_json_1 = __importDefault(require("../../seed-data.json"));
const date_1 = require("../utils/date");
const transactions = (seed_data_json_1.default && seed_data_json_1.default.transactions) || [];
const customers = (seed_data_json_1.default && seed_data_json_1.default.customers) || [
    {
        customerId: "cust_001",
        name: "John Doe",
        email: "john.doe@example.com",
        joinDate: "2023-01-15",
        accountType: "premium",
        currency: "ZAR"
    }
];
const listCategories = () => (seed_data_json_1.default && seed_data_json_1.default.categories) || [];
exports.listCategories = listCategories;
const getCustomerProfile = (customerId) => {
    const customer = customers.find((c) => c.customerId === customerId);
    if (!customer)
        return null;
    const totalSpent = transactions.filter(t => t.customerId === customerId).reduce((s, t) => s + t.amount, 0);
    return {
        ...customer,
        totalSpent: Number(totalSpent.toFixed(2))
    };
};
exports.getCustomerProfile = getCustomerProfile;
const queryTransactions = (customerId, q) => {
    let data = transactions.filter(t => t.customerId === customerId);
    if (q.from)
        data = data.filter(t => (0, dayjs_1.default)(t.date).isAfter((0, dayjs_1.default)(q.from).subtract(1, "day")));
    if (q.to)
        data = data.filter(t => (0, dayjs_1.default)(t.date).isBefore((0, dayjs_1.default)(q.to).add(1, "day")));
    if (q.category)
        data = data.filter(t => t.category === q.category);
    if (q.q) {
        const ql = q.q.toLowerCase();
        data = data.filter(t => t.merchant.toLowerCase().includes(ql) || (t.notes && t.notes.toLowerCase().includes(ql)));
    }
    switch (q.sort) {
        case "date_asc":
            data = data.sort((a, b) => (0, dayjs_1.default)(a.date).valueOf() - (0, dayjs_1.default)(b.date).valueOf());
            break;
        case "amount_asc":
            data = data.sort((a, b) => a.amount - b.amount);
            break;
        case "amount_desc":
            data = data.sort((a, b) => b.amount - a.amount);
            break;
        default:
            data = data.sort((a, b) => (0, dayjs_1.default)(b.date).valueOf() - (0, dayjs_1.default)(a.date).valueOf());
    }
    const total = data.length;
    const offset = q.offset ?? 0;
    const limit = q.limit ?? 100;
    const page = data.slice(offset, offset + limit);
    return { total, offset, limit, data: page };
};
exports.queryTransactions = queryTransactions;
const getSummary = (customerId, period) => {
    const periodRange = (0, date_1.parsePeriod)(period);
    let data = transactions.filter(t => t.customerId === customerId);
    if (periodRange) {
        data = data.filter(t => (0, dayjs_1.default)(t.date).isAfter(periodRange.from) && (0, dayjs_1.default)(t.date).isBefore(periodRange.to));
    }
    const total = Number(data.reduce((s, t) => s + t.amount, 0).toFixed(2));
    const avg = data.length ? Number((total / data.length).toFixed(2)) : 0;
    const months = new Map();
    for (let i = 0; i < 12; i++) {
        months.set((0, dayjs_1.default)().subtract(i, "month").format("YYYY-MM"), 0);
    }
    data.forEach(t => {
        const m = (0, dayjs_1.default)(t.date).format("YYYY-MM");
        months.set(m, (months.get(m) || 0) + t.amount);
    });
    const monthly = Array.from(months.entries()).map(([month, value]) => ({ month, total: Number(value.toFixed(2)) })).reverse();
    const catMap = new Map();
    data.forEach(t => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    const topCategories = Array.from(catMap.entries())
        .map(([name, total]) => ({ name, total: Number(total.toFixed(2)) }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);
    return { total, avg, monthly, topCategories, transactionCount: data.length };
};
exports.getSummary = getSummary;
const goals = [
    { id: (0, uuid_1.v4)(), customerId: "cust_001", name: "Groceries budget", targetAmount: 3000, period: "monthly", progress: 45 }
];
const listGoals = (customerId) => goals.filter(g => g.customerId === customerId);
exports.listGoals = listGoals;
const upsertGoal = (customerId, payload) => {
    const found = goals.find(g => g.customerId === customerId && g.name === payload.name);
    if (found) {
        found.targetAmount = payload.targetAmount;
        found.period = payload.period;
        if (typeof payload.progress === "number")
            found.progress = payload.progress;
        return found;
    }
    const g = { id: (0, uuid_1.v4)(), customerId, name: payload.name, targetAmount: payload.targetAmount, period: payload.period, progress: payload.progress ?? 0 };
    goals.push(g);
    return g;
};
exports.upsertGoal = upsertGoal;
//# sourceMappingURL=dataService.js.map