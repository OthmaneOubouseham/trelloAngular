import { Schema, model } from "mongoose";
import { ColumnDocument } from "../types/column.interface";

const boardSchema = new Schema<ColumnDocument>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: [true, "board ID is required"],
    },
});
export default model<ColumnDocument>("Column", boardSchema);