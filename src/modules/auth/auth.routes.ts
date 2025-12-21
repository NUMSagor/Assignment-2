import { Router } from "express";
import { authControllers } from "./auth.controller";



const router=Router();



router.post("/auth/signup", authControllers.signUp);

router.post("/auth/signin", authControllers.signIn);





export const  authRoutes=router;