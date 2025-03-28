import { NextFunction, Request, Response } from "express";
import { Auth } from "../service/auth.service";


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authroizationHeader = req.headers.authorization

    if (authroizationHeader) {
        const auth = Auth.getInstance()
        const token = authroizationHeader.split('Bearer')[1].trim()
        try {
            const user = auth.verify(token)
            req.user = user
            next()
        } catch(e) {
            res.status(403).send("You are not authorized to access this resource")
        }
    }
}