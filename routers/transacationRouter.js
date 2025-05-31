import express from "express";
import {
  deleteTransactions,
  getTransaction,
  insertTransaction,
} from "../models/transaction/TransactionModel.js";
const router = express.Router();

//post transactions
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add transaction, try again later",
        });
  } catch (error) {
    next(error);
  }
});

//return all the transactions based on the user
router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const transactions = await getTransaction(_id);
    res.json({
      status: "success",
      message: "Here are the transactions",
      transactions,
    });
  } catch (error) {
    next(error);
  }
});

//delete the transactions based on the user
router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    const { _id } = req.userInfo;
    const result = await deleteTransactions(_id, ids);
    res.json({
      status: "success",
      message: result.deletedCount + " transaction(s) deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
