import { ZodError } from "zod";

export const zodErrorResponse = (e: ZodError) => {
    return {
        message: e.issues.map((issue) => (issue.message)).join(", ")
    }
}