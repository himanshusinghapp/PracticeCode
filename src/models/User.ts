import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: number;
}
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 1 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true }
});

export default mongoose.model<IUser>("User", UserSchema);
