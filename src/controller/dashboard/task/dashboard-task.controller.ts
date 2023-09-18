import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.get("/", async () => {});
  app.post("/", async () => {});
  app.delete("/", async () => {});
}
