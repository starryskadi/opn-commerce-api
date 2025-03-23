import { TAddress, UserSchema } from "../schema/user.schema";
import { TUserSchema } from "../schema/user.schema";
import bcrypt from "bcryptjs";

export const bcryptSeed = 10

export class User implements TUserSchema { 
    private _id: number;
    private _email: string;
    private _password: string; 
    private _name: string; 
    private _dateOfBirth: string;
    private _gender: string;
    private _address: TAddress;
    private _subscribeToNewsletter: boolean;   
    
    constructor(user: TUserSchema) {
        const { id, email, password, name, dateOfBirth, gender, address, subscribeToNewsletter} = UserSchema.parse(user)

        const hashedPassword = bcrypt.hashSync(password, bcryptSeed)

        this._id = id
        this._email = email
        this._password = hashedPassword
        this._name = name
        this._dateOfBirth = dateOfBirth
        this._gender = gender
        this._address = address
        this._subscribeToNewsletter = subscribeToNewsletter
    }

    public get id() {
        return this._id
    }

    public get email() {
        return this._email
    }   

    public set email(email: string) {
        this._email = email
    }

    public get password() {
        return this._password
    }       

    public set password(password: string) {
        const hashedPassword = bcrypt.hashSync(password, bcryptSeed)

        this._password = hashedPassword
    }

    public get name() {
        return this._name
    }       
    
    public set name(name: string) {
        this._name = name
    }   

    public get dateOfBirth() {
        return this._dateOfBirth
    }

    public set dateOfBirth(dateOfBirth: string) {
        this._dateOfBirth = dateOfBirth
    }

    public get gender() {
        return this._gender
    }

    public set gender(gender: string) {
        this._gender = gender
    }

    public get address() {
        return this._address
    } 

    public set address(address: TAddress) {
        this._address = address
    }

    public get subscribeToNewsletter() {
        return this._subscribeToNewsletter
    }

    public set subscribeToNewsletter(subscribeToNewsletter: boolean) {
        this._subscribeToNewsletter = subscribeToNewsletter
    }
}
