import { Request } from "express";
import { UserDocument } from "../types/user.interface";

export interface ExpressRequestInterface extends Request {
    user?: UserDocument;
}
