import { Document } from "mongoose";

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    // Add other fields if necessary
}

export interface UserDocument extends Document, User {
    comparePassword: (password: string) => Promise<boolean>;
}

