import Fastify, { FastifyServerOptions } from "fastify";
import prismaPlugin from "./plugin/prisma.plugin";
import autoLoadPlugin from "./plugin/auto-load.plugin";
import envPlugin from "./plugin/env.plugin";
import swaggerPlugin from "./plugin/swagger.plugin";
import autoLoad from "@fastify/autoload";
import path from "path";
import bcryptPlugin from "./plugin/bcrypt.plugin";
export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);
  fastify.register(envPlugin);
  fastify.register(prismaPlugin);
  fastify.register(swaggerPlugin);
  fastify.register(bcryptPlugin);
  fastify.register(autoLoad, {
    dir: path.join(__dirname, "controller"),
    dirNameRoutePrefix: (folderParent: string, folderName: string) => {
      console.log(folderName.toLowerCase(), folderParent.toLowerCase());
      return folderName.toLowerCase();
    },
    indexPattern: /.*controller.(?:js|ts)/,
    ignorePattern: /.*(?:test|spec|plugin).(?:js|ts)/,
  });
  return fastify;
}

export { buildApp };
