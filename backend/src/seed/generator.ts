import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";

const categories = [
  "Groceries","Entertainment","Utilities","Transport","Eating Out","Health","Shopping","Bills","Travel","Other"
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

const transactions = [] as any[];
const now = dayjs();
for (let i = 0; i < 800; i++) {
  const monthsBack = Math.floor(Math.random() * 12);
  const date = now.subtract(monthsBack, "month").subtract(Math.floor(Math.random() * 28), "day").toISOString();
  transactions.push({
    id: uuid(),
    customerId: "cust_001",
    date,
    amount: rndAmount(5, 1500),
    currency: "ZAR",
    merchant: faker.company.name(),
    category: faker.helpers.arrayElement(categories),
    paymentMethod: faker.helpers.arrayElement(["card", "cash", "eft"]),
    notes: faker.lorem.sentence(6)
  });
}

const out = {
  customers,
  transactions,
  categories: categories.map((c, i) => ({
    name: c,
    color: ["#FF6B6B","#4ECDC4","#FFD93D","#5D5FEF","#FFA07A","#9B5DE5","#00B4D8","#7BF1A8","#F95D6A","#C0C0C0"][i % 10],
    icon: "shopping-cart"
  }))
};

const outPath = path.join(process.cwd(), "seed-data.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
console.log("Wrote seed-data.json with", transactions.length, "transactions at", outPath);
