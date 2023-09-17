import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  console.log("dashboard user");
  app.get("/", () => "get all user in dashboard");
  app.post("/", () => "add new user into dashboard");
  app.delete("/", () => "delete user from dashboard by id");
}
