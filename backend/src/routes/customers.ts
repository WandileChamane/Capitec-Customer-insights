import { Router } from "express";
import * as ctrl from "../controllers/customersController";

const router = Router();

router.get("/:customerId/profile", ctrl.getProfile);
router.get("/:customerId/transactions", ctrl.getTransactions);
router.get("/:customerId/summary", ctrl.getSummary);
router.get("/:customerId/categories", ctrl.getCategories);
router.get("/:customerId/goals", ctrl.getGoals);
router.post("/:customerId/goals", ctrl.postGoal);

export default router;
