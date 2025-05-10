import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import User,{IUser} from "../models/User";
import { userValidationSchema } from "../validation/userValidation";
import { MESSAGES,STATUS_CODES } from "../constants";

export const userRegister = async(req:Request,res:Response)=>{
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) return res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    
        const { name, age, email, password, phoneNumber } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: MESSAGES.USER_EXISTS });

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
        res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.USER_CREATED });
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message:MESSAGES.SERVER_ERROR, error });
    }
};
//login

export const loginUser = async(req: Request, res: Response)=>{
    try{
        const {email, password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(STATUS_CODES.BAD_REQUEST).json({message:MESSAGES.INVALID_CREDENTIALS});
        }
        const isPassMatch = await bcrypt.compare(password,user.password);
        if(!isPassMatch){
            return res.status(STATUS_CODES.BAD_REQUEST).json({message:MESSAGES.INVALID_CREDENTIALS});
        }
        res.status(STATUS_CODES.SUCCESS).json({message:MESSAGES.USER_LOGIN});
    }
    catch(err){
        res.status(STATUS_CODES.SERVER_ERROR).json({message:MESSAGES.SERVER_ERROR,err});
    }
};

//fetch data

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(STATUS_CODES.SUCCESS).json(users);
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: MESSAGES.SERVER_ERROR, error });
    }
};