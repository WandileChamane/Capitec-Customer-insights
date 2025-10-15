import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import customersRoutes from "./routes/customers";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/customers", customersRoutes);

export default app;
