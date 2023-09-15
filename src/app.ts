import Fastify, { FastifyServerOptions } from 'fastify'
import prismaPlugin from './plugin/prisma.plugin';
import autoLoadPlugin from './plugin/auto-load.plugin';
import envPlugin from './plugin/env.plugin';
import swaggerPlugin from './plugin/swagger.plugin';
import autoLoad from '@fastify/autoload'
import path from 'path';
export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);
  fastify.register(envPlugin);
  fastify.register(prismaPlugin)
  fastify.register(autoLoad, {
    dir: path.join(__dirname),
    dirNameRoutePrefix: function (folderParent: string, folderName: string) {
      console.log(folderParent, folderName);
      return true;
    },
    indexPattern: /.*controller.(?:js|ts)/,
    ignorePattern: /.*(?:test|spec).(?:js|ts)/
  });
  fastify.register(swaggerPlugin);
  return fastify;
}

export { buildApp }