import express from "express";
import { userRegister,loginUser,getUsers } from "../controllers/userController";

const route = express.Router();

route.post("/register",userRegister);
route.post("/login",loginUser);
route.get("/user",getUsers);

export default route;