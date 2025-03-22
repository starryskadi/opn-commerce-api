import * as z from "zod"

export const AdressDataSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string()
})

export const UserSchema = z.object({
    id: z.number(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.string(),
    gender: z.string(),
    address: AdressDataSchema,
    subscribeToNewsletter: z.boolean()
})

export type TAddress = z.infer<typeof AdressDataSchema>

export type TUserSchema = z.infer<typeof UserSchema>

