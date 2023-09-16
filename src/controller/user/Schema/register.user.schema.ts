import { Type } from "@sinclair/typebox";

export const RegisterUserSchema = Type.Object({
    username: Type.String(),
    password: Type.String()
})