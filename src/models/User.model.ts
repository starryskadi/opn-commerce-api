import { TAddress, UserSchema } from "../schema/user.schema";
import { TUserSchema } from "../schema/user.schema";
import bcrypt from "bcryptjs";

export const bcryptSeed = 10

export class User implements TUserSchema { 
    id: number;
    email: string;
    password: string; 
    name: string; 
    dateOfBirth: string;
    gender: string;
    address: TAddress;
    subscribeToNewsletter: boolean;   
    
    constructor(user: User) {
        const { id, email, password, name, dateOfBirth, gender, address, subscribeToNewsletter} = UserSchema.parse(user)

        const hashedPassword = bcrypt.hashSync(password, bcryptSeed)

        this.id = id
        this.email = email
        this.password = hashedPassword
        this.name = name
        this.dateOfBirth = dateOfBirth
        this.gender = gender
        this.address = address
        this.subscribeToNewsletter = subscribeToNewsletter
    }
}
