import bycrpt from "bcryptjs";
import { User } from "../models/User.model";
import { UserCollection } from "../models/UserCollection.model";
// Singleton to share the data across the application
let instance: UserService; 

export class UserService {
    private userCollection: UserCollection = new UserCollection()

    constructor() {
        if (instance) return instance

        instance = this
    }

    public isUserEmailExist(user: Pick<User, 'email'>) {
        try { 
            return !!this.userCollection.getByEmail({ email: user.email }) 
        } 
        catch(e) {
            return false
        }
    }

    public login(user: Pick<User, 'email' | 'password'>) {
        const loggedInUser = this.userCollection.getByEmail({ email: user.email }) 
 
        const isPasswordSame = bycrpt.compareSync(user.password, loggedInUser.password)

        if (!isPasswordSame) {
            throw Error("Username / Password incorrect")
        }  

        return this.userWithoutPassword(loggedInUser)   
    }

    public register(user: Omit<User, 'id'>) {
        if (this.isUserEmailExist(user)) {
            throw Error("Your account already existed.")
        }

        const createdUser = this.userCollection.create(user)

        return this.userWithoutPassword(createdUser)
    }

    public updatePassword(info: Pick<User, 'id' | 'password'> & { newPassword: string, confirmNewPassword: string }) {
        const { id, password, confirmNewPassword, newPassword } = info

        if (newPassword !== confirmNewPassword) {
            throw Error("New password and confirmed password are not same")
        }

        const currentUser = this.userCollection.getById({ id })

        if (!currentUser) {
            throw Error("User doesn't exist")
        }

        const isPasswordCorrect = bycrpt.compareSync(password, currentUser.password)

        if (!isPasswordCorrect) {
            throw Error("Current Password is incorrect")
        }

        const updatedUser = {
            ...currentUser,
            password: newPassword
        }

        return this.userWithoutPassword(this.userCollection.updateByID(updatedUser))
    }

    public userWithoutPassword(user: User) {
        const userWithoutPassword: PartialBy<User, 'password'> = { ...user};

        delete userWithoutPassword.password

        return userWithoutPassword
    }

    public getProfile(user: Pick<User, 'id'>) {
        return this.userWithoutPassword(this.userCollection.getById(user))
    }

    public updateProfile(user: Partial<Omit<User, 'email' | 'password' | 'name'>> & Pick<User, 'id'>) {
        return this.userCollection.updateByID(user)
    }

    public deleteProfile(user: Pick<User, 'id'>) {
        return this.userCollection.deleteByID(user)
    }
}