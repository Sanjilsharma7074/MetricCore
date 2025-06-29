import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  githubId: string;
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
