import mongoose from "mongoose";
const MONGOURL = "mongodb://localhost:27017/finance_tracker";

export const connMongo = async () => {
  try {
    const conn = await mongoose.connect(MONGOURL);
    conn && console.log("mongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
