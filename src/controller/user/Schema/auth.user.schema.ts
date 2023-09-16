import { Type } from "@sinclair/typebox";

export const AuthUserSchema = Type.Object({
    username: Type.String(),
    password: Type.String()
})