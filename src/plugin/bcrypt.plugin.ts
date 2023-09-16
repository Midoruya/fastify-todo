import fp from 'fastify-plugin';
import fastifyBcrypt from 'fastify-bcrypt';

const bcryptPlugin = fp(async (server) => {
    server.register(fastifyBcrypt, {
        saltWorkFactor: 12
    })
})

export default bcryptPlugin