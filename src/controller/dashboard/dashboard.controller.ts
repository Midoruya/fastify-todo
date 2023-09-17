import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateDashboardSchema } from "./schema/create-dashboard.schema";
import { Static } from "@sinclair/typebox";
import { DeleteDashboardSchema } from "./schema/delete-dashboard.schema";

export default async function (app: FastifyInstance) {
  console.log("dashboard");
  app.get("/", async (request, response) => {
    const userId = 0;
    // TODO: Нужно сделать что бы возврашались дашборды только тем кто на них подписан
    const list = await app.prisma.linkUserToDashboard.findMany({
      where: { userId: userId },
      take: 100,
    });
    return list;
  });
  app.post(
    "/",
    { schema: { body: CreateDashboardSchema } },
    async (
      request: FastifyRequest<{ Body: Static<typeof CreateDashboardSchema> }>,
      response
    ) => {
      // TODO: Нужно сделать что бы возврашались дашборды только тем кто на них подписан
      const payload = request.body;
      const create = await app.prisma.dashboard.create({
        data: {
          name: payload.name,
          description: payload.description,
        },
      });
      return create;
    }
  );
  app.delete(
    "/:id",
    { schema: { params: DeleteDashboardSchema } },
    async (
      request: FastifyRequest<{ Params: Static<typeof DeleteDashboardSchema> }>,
      response
    ) => {
      // TODO: Нужно сделать что бы возврашались дашборды только тем кто на них подписан
      const payload = request.params;
      const data = await app.prisma.dashboard.delete({
        where: {
          id: payload.id,
        },
      });
      return data;
    }
  );
}
