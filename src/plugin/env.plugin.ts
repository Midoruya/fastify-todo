import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { Type, Static } from "@sinclair/typebox";
import fp from "fastify-plugin";

const schema = Type.Object({
  DATABASE_URL: Type.String(),
  PORT: Type.Optional(Type.Number({ default: 5000 })),
  JWT_SECRET: Type.Optional(Type.String({ default: "superSecret" })),
  JWT_TIME_LIFE: Type.Optional(Type.String({ default: "1h" })),
});

const option = {
  confKey: "config",
  schema: schema,
  env: true,
  dotenv: true,
  data: process.env,
} as FastifyEnvOptions;

declare module "fastify" {
  interface FastifyInstance {
    config: Static<typeof schema>;
  }
}

const envPlugin = fp(async (server) => {
  server.register(fastifyEnv, option);
  await server.after();
  console.log(server.config);
});

export default envPlugin;
