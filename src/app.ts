import Fastify, { FastifyServerOptions } from 'fastify'
import autoLoad from '@fastify/autoload'
import path from 'path';
import prismaPlugin from './plugin/prisma.plugin';

export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);
  console.log(path.join(__dirname));
  
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
  return fastify;
}

export { buildApp }