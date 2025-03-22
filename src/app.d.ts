import { type User } from "./service/user.service"

declare global {
    namespace Express {
        export interface Request {
            user?: User
        }
    }

    type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
}

