import { Schema, Document} from "mongoose";


export interface Column {
    title: string;
    createAt: Date;
    updatedAt: Date;
    userId: Schema.Types.ObjectId;
    boardId: Schema.Types.ObjectId;
}

export interface ColumnDocument extends Document, Column {
    // Add any additional methods or properties if needed
}