// DTOs for the user routes

import * as z from "zod";
import { UserSchema, PasswordSchema } from "../schema/user.schema";

export const registerUserDTO = UserSchema.omit({ id: true }).strict()

export const updateProfileDTO = UserSchema.pick({ address: true, subscribeToNewsletter: true, gender: true, dateOfBirth: true }).partial().strict()

export const changePasswordDTO = UserSchema.pick({ password: true }).merge(z.object({ newPassword: PasswordSchema, confirmNewPassword: PasswordSchema })).strict()

export const loginDTO = UserSchema.pick({ email: true, password: true }).strict()