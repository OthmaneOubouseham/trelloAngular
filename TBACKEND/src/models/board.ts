import { Schema, model } from "mongoose";
import { BoardDocument } from "../types/Board.interface";

const boardSchema = new Schema<BoardDocument>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
});
export default model<BoardDocument>("Board", boardSchema);