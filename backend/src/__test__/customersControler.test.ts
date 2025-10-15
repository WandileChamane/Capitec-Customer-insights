// __tests__/customerController.test.ts
import { Request, Response } from "express";
import * as data from "../services/dataService";
import * as controller from "../controllers/customersController";

jest.mock("../services/dataService");

describe("Customer Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("should return profile if found", () => {
      const mockProfile = { id: "cust_001", name: "John Doe" };
      (data.getCustomerProfile as jest.Mock).mockReturnValue(mockProfile);

      req.params = { customerId: "cust_001" };

      controller.getProfile(req as Request, res as Response);

      expect(data.getCustomerProfile).toHaveBeenCalledWith("cust_001");
      expect(jsonMock).toHaveBeenCalledWith(mockProfile);
    });

    it("should return 404 if profile not found", () => {
      (data.getCustomerProfile as jest.Mock).mockReturnValue(undefined);

      req.params = { customerId: "cust_002" };

      controller.getProfile(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Customer not found" });
    });
  });

  describe("getTransactions", () => {
    it("should call queryTransactions with params and return result", () => {
      const mockResult = [{ id: 1, amount: 100 }];
      (data.queryTransactions as jest.Mock).mockReturnValue(mockResult);

      req.params = { customerId: "cust_001" };
      req.query = { from: "2025-01-01", limit: "10" };

      controller.getTransactions(req as Request, res as Response);

      expect(data.queryTransactions).toHaveBeenCalledWith("cust_001", {
        from: "2025-01-01",
        limit: 10,
      });
      expect(jsonMock).toHaveBeenCalledWith(mockResult);
    });
  });

  describe("getSummary", () => {
    it("should call getSummary with customerId and period", () => {
      const mockSummary = { topCategories: [] };
      (data.getSummary as jest.Mock).mockReturnValue(mockSummary);

      req.params = { customerId: "cust_001" };
      req.query = { period: "2025-Q3" };

      controller.getSummary(req as Request, res as Response);

      expect(data.getSummary).toHaveBeenCalledWith("cust_001", "2025-Q3");
      expect(jsonMock).toHaveBeenCalledWith(mockSummary);
    });
  });

  describe("getCategories", () => {
    it("should return list of categories", () => {
      const categories = ["Food", "Transport"];
      (data.listCategories as jest.Mock).mockReturnValue(categories);

      controller.getCategories(req as Request, res as Response);

      expect(data.listCategories).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(categories);
    });
  });

  describe("getGoals", () => {
    it("should return goals for customer", () => {
      const goals = [{ name: "Save", targetAmount: 500 }];
      (data.listGoals as jest.Mock).mockReturnValue(goals);

      req.params = { customerId: "cust_001" };

      controller.getGoals(req as Request, res as Response);

      expect(data.listGoals).toHaveBeenCalledWith("cust_001");
      expect(jsonMock).toHaveBeenCalledWith(goals);
    });
  });

  describe("postGoal", () => {
    it("should return 400 if payload is invalid", () => {
      req.params = { customerId: "cust_001" };
      req.body = { name: "Save" }; // missing targetAmount and period

      controller.postGoal(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Invalid payload: name, targetAmount (number) and period required",
      });
    });

    it("should upsert goal and return 201 if payload is valid", () => {
      const newGoal = { name: "Save", targetAmount: 1000, period: "monthly" };
      (data.upsertGoal as jest.Mock).mockReturnValue(newGoal);

      req.params = { customerId: "cust_001" };
      req.body = newGoal;

      controller.postGoal(req as Request, res as Response);

      expect(data.upsertGoal).toHaveBeenCalledWith("cust_001", newGoal);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(newGoal);
    });
  });
});
