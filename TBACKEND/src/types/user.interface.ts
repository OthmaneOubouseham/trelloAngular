import { Document } from "mongoose";

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDocument extends Document, User {
    comparePassword: (password: string) => Promise<boolean>;
}

