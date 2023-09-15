import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from "@fastify/swagger-ui";

const swaggerOptions = {
    swagger: {
        info: {
            title: "My Title",
            description: "My Description.",
            version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

const swaggerPlugin = fp(async (server) => {
    server.register(fastifySwagger, swaggerOptions)
    server.register(fastifySwaggerUi, swaggerUiOptions)
    console.log(4324);
    
});

export default swaggerPlugin;