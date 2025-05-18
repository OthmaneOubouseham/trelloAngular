import {Schema} from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { copyFileSync } from 'fs';
import { UserDocument } from '../types/user.interface';
import validator from 'validator';

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        createIndexes: {unique: true}
    },
    username: {
        type: String,
        // required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        },
    
    },
    {
        timestamps: true,
    }
);

userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err as Error);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};
export default mongoose.model('User', userSchema);


