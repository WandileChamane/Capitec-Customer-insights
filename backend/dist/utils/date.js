"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePeriod = exports.toISO = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const toISO = (d) => (0, dayjs_1.default)(d).toISOString();
exports.toISO = toISO;
const parsePeriod = (period) => {
    if (!period)
        return null;
    const num = parseInt(period, 10);
    if (period.endsWith("d"))
        return { from: (0, dayjs_1.default)().subtract(num, "day").toISOString(), to: (0, dayjs_1.default)().toISOString() };
    if (period.endsWith("y"))
        return { from: (0, dayjs_1.default)().subtract(num, "year").toISOString(), to: (0, dayjs_1.default)().toISOString() };
    return null;
};
exports.parsePeriod = parsePeriod;
//# sourceMappingURL=date.js.map