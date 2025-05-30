import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { signJwt } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";
const router = express.Router();

// user signup
router.post("/", async (req, res, next) => {
  try {
    //get the userobj
    //encrypt the password
    req.body.password = await hashPassword(req.body.password);

    //insert the user
    const user = await insertUser(req.body);

    user._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message: "Error creating user. Please try agin later.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is another user have used this email, try to login or use from different email.";
    }
    error.statusCode = 200;
    next(error);
  }
});

// user login
router.post("/login", async (req, res, next) => {
  try {
    // 1. receive email
    const { email, password } = req.body;

    if (email && password) {
      // 2. find the user by email
      const user = await getUserByEmail(email);

      if (user?._id) {
        // 3. match the password
        const isMatched = await comparePassword(password, user.password);
        if (isMatched) {
          // the user actually authenticated

          // 4. Jwt and store the jwt in db then return the user {} with jwt token
          const accessJWT = signJwt({
            email: email,
          });

          user.password = undefined;
          res.json({
            status: "success",
            message: "Logged in successfully",
            user: user,
            accessJWT,
          });
        } else {
          res.status(401).json({
            error: "Invalid email or password",
          });
        }
        return;
      }
    }

    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    next(error);
  }
});

//user  profile from the accessJWT
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    user.password = undefined;
    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
