import seedUsers from "../data/user.seed.json"
import { User } from "../models/User.model";
// Singleton to share the data across the application
let instance: UserCollection; 

export class UserCollection {
    private users: User[] = []
    private lastIDIndex = 0;

    constructor() {
        if (instance) return instance

        instance = this

        this.seedUsers()
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

    public create(user: Omit<User, 'id'>) {
        const id = this.ID()
        this.users.push(new User({
            ...user,
            id: id
        }))

        return {
             ...user,
             id
        }
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
        const userFoundIndex = this.users.findIndex((value) => {
            return value.id === user.id
        })

        if (userFoundIndex < 0) {
            throw Error("User doesn't exist")
        }

        const updatedUser = new User({
            ...this.users[userFoundIndex],
            ...user
        })

        console.log(updatedUser)

        this.users[userFoundIndex] = updatedUser
        
        return updatedUser
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