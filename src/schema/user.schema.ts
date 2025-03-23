import * as z from "zod"

export const PasswordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password cannot exceed 100 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })

export const AdressDataSchema = z.object({
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipCode: z.string().min(1, { message: "Zip code is required" }),
    country: z.string().min(1, { message: "Country is required" })
})

export const UserSchema = z.object({
    id: z.number().int({ message: "ID must be an integer" }).positive({ message: "ID must be positive" }),
    password: PasswordSchema,
    email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    address: AdressDataSchema,
    subscribeToNewsletter: z.boolean()
})

export type TAddress = z.infer<typeof AdressDataSchema>

export type TUserSchema = z.infer<typeof UserSchema>

