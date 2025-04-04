import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import User,{IUser} from "../models/User";
import { userValidationSchema } from "../validation/userValidation";


export const userRegister = async(req:Request,res:Response)=>{
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
    
        const { name, age, email, password, phoneNumber } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            name,
            age,
            email,
            password: hashedPassword,
            phoneNumber,
        });
    
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
//login

export const loginUser = async(req: Request, res: Response)=>{
    try{
        const {email, password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Login failed"});
        }
        const isPassMatch = await bcrypt.compare(password,user.password);
        if(!isPassMatch){
            return res.status(400).json({message:"Login failed"});
        }
        res.status(200).json({message:"Login successfully"});
    }
    catch(err){
        res.status(500).json({message:"internal server error",err});
    }
};

//fetch data

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};