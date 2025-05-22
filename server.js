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
console.log(process.env.JWT_SECRET);

import userRouter from "./routers/userRouter.js";
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.json({
    message: "It's live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log("Error")
    : console.log(`Server is running at http://localhost:${PORT}`);
});
