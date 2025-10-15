"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGoal = exports.getGoals = exports.getCategories = exports.getSummary = exports.getTransactions = exports.getProfile = void 0;
const data = __importStar(require("../services/dataService"));
const getProfile = (req, res) => {
    const { customerId } = req.params;
    const profile = data.getCustomerProfile(customerId);
    if (!profile)
        return res.status(404).json({ message: "Customer not found" });
    return res.json(profile);
};
exports.getProfile = getProfile;
const getTransactions = (req, res) => {
    const { customerId } = req.params;
    const { from, to, category, q, limit, offset, sort, period } = req.query;
    let params = {};
    if (from)
        params.from = String(from);
    if (to)
        params.to = String(to);
    if (category)
        params.category = String(category);
    if (q)
        params.q = String(q);
    if (limit)
        params.limit = Number(limit);
    if (offset)
        params.offset = Number(offset);
    if (sort)
        params.sort = String(sort);
    if (period)
        params.period = String(period);
    const result = data.queryTransactions(customerId, params);
    return res.json(result);
};
exports.getTransactions = getTransactions;
const getSummary = (req, res) => {
    const { customerId } = req.params;
    const { period } = req.query;
    const summary = data.getSummary(customerId, typeof period === "string" ? period : undefined);
    return res.json(summary);
};
exports.getSummary = getSummary;
const getCategories = (req, res) => {
    return res.json(data.listCategories());
};
exports.getCategories = getCategories;
const getGoals = (req, res) => {
    const { customerId } = req.params;
    return res.json(data.listGoals(customerId));
};
exports.getGoals = getGoals;
const postGoal = (req, res) => {
    const { customerId } = req.params;
    const body = req.body;
    if (!body || !body.name || typeof body.targetAmount !== "number" || !body.period) {
        return res.status(400).json({ message: "Invalid payload: name, targetAmount (number) and period required" });
    }
    const g = data.upsertGoal(customerId, body);
    return res.status(201).json(g);
};
exports.postGoal = postGoal;
//# sourceMappingURL=customersController.js.map