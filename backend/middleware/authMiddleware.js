import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import usermodel from "../models/User.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await usermodel
      .findById(decoded.id)
      .select("-password");

    req.user = user;

    next(); // 🔥 VERY IMPORTANT
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protectRoute;