import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL as string;

const connectMongo = async() =>{
    try{
        await mongoose.connect(mongoDbUrl);
        console.log("connected successfully");
    }
    catch(err){
        console.log("connection fail:",err);
        process.exit(1);
    }
}

export default connectMongo;