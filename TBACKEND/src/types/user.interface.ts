import { Document } from "mongoose";

export interface User {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    }
export interface UserDocument extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}

