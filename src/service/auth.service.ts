import { UserCollection } from "../models/UserCollection.model"
import { User } from "../models/User.model"

type Token = string;

// Signleton to avoid multiple intialization
export class Auth {
    private userCollection:UserCollection = UserCollection.getInstance()
    private static instance: Auth

    private constructor() {
    
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Auth()
        }
        return this.instance
    }

    // Authentication should be verified from header "Authorization" with mock value e.g.: Authorization: Bearer faketoken_user1
    public token(user: Pick<User, "id">): Token {
        const loggedInUser = this.userCollection.getById({
            id: user.id
        })

        const token: Token = `faketokenuser_${loggedInUser.id}` 
        return token
    }
    public verify(token: Token): User {
        const userId = Number(token.split("_")[1])
        return this.userCollection.getById({
            id: userId
        })
    }
}
