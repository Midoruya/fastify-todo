import Fastify, { FastifyServerOptions } from 'fastify'
import prismaPlugin from './plugin/prisma.plugin';
import autoLoadPlugin from './plugin/auto-load.plugin';

export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);
  fastify.register(prismaPlugin)
  fastify.register(autoLoadPlugin);
  return fastify;
}

export { buildApp }