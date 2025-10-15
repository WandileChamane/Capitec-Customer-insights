"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const categories = [
    "Groceries", "Entertainment", "Utilities", "Transport", "Eating Out", "Health", "Shopping", "Bills", "Travel", "Other"
];
function rndAmount(min = 10, max = 2500) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}
const customers = [
    {
        customerId: "cust_001",
        name: "John Doe",
        email: "john.doe@example.com",
        joinDate: "2023-01-15",
        accountType: "premium",
        currency: "ZAR"
    }
];
const transactions = [];
const now = (0, dayjs_1.default)();
for (let i = 0; i < 800; i++) {
    const monthsBack = Math.floor(Math.random() * 12);
    const date = now.subtract(monthsBack, "month").subtract(Math.floor(Math.random() * 28), "day").toISOString();
    transactions.push({
        id: (0, uuid_1.v4)(),
        customerId: "cust_001",
        date,
        amount: rndAmount(5, 1500),
        currency: "ZAR",
        merchant: faker_1.faker.company.name(),
        category: faker_1.faker.helpers.arrayElement(categories),
        paymentMethod: faker_1.faker.helpers.arrayElement(["card", "cash", "eft"]),
        notes: faker_1.faker.lorem.sentence(6)
    });
}
const out = {
    customers,
    transactions,
    categories: categories.map((c, i) => ({
        name: c,
        color: ["#FF6B6B", "#4ECDC4", "#FFD93D", "#5D5FEF", "#FFA07A", "#9B5DE5", "#00B4D8", "#7BF1A8", "#F95D6A", "#C0C0C0"][i % 10],
        icon: "shopping-cart"
    }))
};
const outPath = path_1.default.join(process.cwd(), "seed-data.json");
fs_1.default.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
console.log("Wrote seed-data.json with", transactions.length, "transactions at", outPath);
//# sourceMappingURL=generator.js.map