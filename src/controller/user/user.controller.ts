import { FastifyInstance } from "fastify"
import { RegisterUserSchema } from "./Schema/register.user.schema"
import { AuthUserSchema } from "./Schema/auth.user.schema"
import { FastifyRequest } from "fastify/types/request"
import { Static } from "@sinclair/typebox"

export default async function (app: FastifyInstance) {
  app.post('/auth', { schema: { body: AuthUserSchema } }, async (request: FastifyRequest<{ Body: Static<typeof AuthUserSchema> }>, response) => {
    const payload = request.body;
    const getUserData = await app.prisma.user.findFirst({ where: { name: payload.username } })
    if (!getUserData) {
      response.code(404)
      throw new Error('Пользователь не найден')
    }
    const isValidPassword = await app.bcrypt.compare(payload.password, getUserData.password)
    if (!isValidPassword) {
      response.code(404)
      throw new Error('Не верное имя пользователя или пароль')
    }
    return getUserData
  })
  app.post('/register', { schema: { body: RegisterUserSchema } }, async (request: FastifyRequest<{ Body: Static<typeof RegisterUserSchema> }>, response) => {
    const payload = request.body
    const isHasAccount = await app.prisma.user.findFirst({ where: { name: payload.username } })
    if (!!isHasAccount) {
      response.status(400)
      throw new Error('Был найден пользователь')
    }
    const newPasswordHash = await app.bcrypt.hash(payload.password)
    const result = await app.prisma.user.create({
      data: {
        name: payload.username,
        password: newPasswordHash
      }
    })
    return result    
  })
}