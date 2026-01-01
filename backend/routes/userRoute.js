

import express from "express";
import { loginUser, registerUser, adminLogin, seedAdmin } from "../controller/userController.js";

const userRoute = express.Router();

// user
 userRoute.post("/login", loginUser);
 userRoute.post("/register", registerUser);

// admin
 userRoute.post("/admin/login", adminLogin);

// TEMP seed route — hit once then remove/comment
 userRoute.post("/admin/seed", seedAdmin);

export default userRoute;

