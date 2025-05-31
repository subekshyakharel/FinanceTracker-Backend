import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import cors from "cors";

// connect db
import { connMongo } from "./config/Mongodbconfig.js";
connMongo();

//MiddleWares
app.use(express.json());
app.use(cors());

import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transacationRouter.js";
import { auth } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", auth, transactionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "It's live",
  });
});

//404 page not found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

//Global error handler
app.use(errorHandler);

app.listen(PORT, (error) => {
  error
    ? console.log("Error")
    : console.log(`Server is running at http://localhost:${PORT}`);
});
