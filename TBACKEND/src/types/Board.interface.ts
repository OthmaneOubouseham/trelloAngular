import { Schema, Document} from "mongoose";


export interface Board {
    title: string;
    createAt: Date;
    updatedAt: Date;
    userId: Schema.Types.ObjectId;
}

export interface BoardDocument extends Document, Board {
    // Add any additional methods or properties if needed
}