import { Response } from "express";

export const errorResponse = (e: unknown, res: Response) => {
    if (e instanceof Error) {
        res.status(400).json({
            message: e.message
        })
        return
    }

    res.status(500).json({
        message: "Something went wrong!"
    })
}