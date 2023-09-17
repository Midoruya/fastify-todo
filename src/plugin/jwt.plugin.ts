import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export interface IJwtContent {
  userId: number;
  iat?: number;
  exp?: number;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: IJwtContent;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      response: FastifyReply
    ) => Promise<void>;
    createUserAuthToken: (userId: number) => Promise<string>;
    getUserTokenData: (token: string) => Promise<IJwtContent>;
  }
}

const jwtPlugin = fp(async (server) => {
  server.register(fastifyJwt, {
    secret: server.config.JWT_SECRET?.toString() || "secrete",
    sign: { expiresIn: server.config.JWT_TIME_LIFE || "1m" },
  });
  server.decorate(
    "authenticate",
    async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify<IJwtContent>();
      } catch (err) {
        response.code(401);
        response.send(err);
      }
    }
  );
  server.decorate(
    "getUserTokenData",
    async (token: string): Promise<IJwtContent> => {
      const isValidToken = server.jwt.verify(token);
      if (!isValidToken) {
        throw new Error("Не валидный токен");
      }
      const result = await server.jwt.decode<IJwtContent>(token);
      if (!result) throw new Error("Не валидный токен");
      return result;
    }
  );
  server.decorate(
    "createUserAuthToken",
    async (userId: number): Promise<string> => {
      return await server.jwt.sign({
        userId,
      } as IJwtContent);
    }
  );
});

export default jwtPlugin;
