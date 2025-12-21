import { Request, Response } from "express";
import { authServices } from "./auth.service";



const signUp = async (req: Request, res: Response) => {
    try {
        const result = await authServices.signUp(req.body);

        res.status(201).json({
            success: true,
            message: "User signed up or registered  successfully",
            data: result,
        }); 
        
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
 };



 const signIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    console.log("BODY:", req.body);

 try {
    const result = await authServices.signIn(email, password);

    if (!result) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: result,
    });

    
} catch (error: any) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: error.message
    });
}
 };

 export const authControllers = {
    signUp,
    signIn,
 }