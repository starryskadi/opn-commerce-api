import seedUsers from "../data/user.seed.json"
import { User } from "../models/User.model";
import { UserSchema } from "../schema/user.schema";
// Singleton to share the data across the application
export class UserCollection {
    private users: User[] = []
    private lastIDIndex = 0;
    private static instance: UserCollection;

    private constructor() {
        this.seedUsers()
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserCollection()
        }
        return this.instance
    }

    private ID() {
        this.lastIDIndex++ 
        return this.lastIDIndex
    }

    private seedUsers() {
        this.users = seedUsers.users.map(user => {
            return new User({
                ...user,
                id: this.ID()
            })
        }) 
    }

    public create(user: Omit<User, 'id'>): User {
        const id = this.ID()
        const createdUser = new User({
            ...user,
            id: id
        })
        this.users.push(createdUser)

        return createdUser
    }

    public getById(user: Pick<User, 'id'>) {
        const userFound = this.users.find(u => {
            return u.id === user.id
        })

        if (!userFound) {
            throw Error("User doesn't exist")
        }

        return userFound
    }

    public getByEmail(user: Pick<User, 'email'>) {
        const userFound = this.users.find(u => {
            return u.email === user.email
        })

        if (!userFound) {
            throw Error("User doesn't exist")
        }

        return userFound
    }


    public getAll() {
        return this.users
    }

    public updateByID(user: Partial<Omit<User, 'id'>> & Pick<User, 'id'>) {
        const foundUser = this.users.find(u => u.id === user.id)

        if (!foundUser) {
            throw Error("User doesn't exist")
        }

        if (user.email) foundUser.email = user.email;
        if (user.password) foundUser.password = user.password;
        if (user.name) foundUser.name = user.name;
        if (user.dateOfBirth) foundUser.dateOfBirth = user.dateOfBirth;
        if (user.gender) foundUser.gender = user.gender;
        if (user.address) foundUser.address = user.address;
        if (user.subscribeToNewsletter) foundUser.subscribeToNewsletter = user.subscribeToNewsletter;

        return foundUser
    }

    public deleteByID(user: Pick<User, 'id'>) {
        const index = this.users.findIndex(value => {
            return value.id === user.id
        })

        if (index < 0) {
            throw Error("User doesn't exist")
        }

        this.users.splice(index, 1)

        return true
    } 
}