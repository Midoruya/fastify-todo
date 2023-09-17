import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  console.log("init");
  app.get("/", () => {
    return { something: "else" };
  });
}
