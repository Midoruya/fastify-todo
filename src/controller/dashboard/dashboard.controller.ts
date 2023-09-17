import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateDashboardSchema } from "./schema/create-dashboard.schema";
import { Static } from "@sinclair/typebox";
import { DeleteDashboardSchema } from "./schema/delete-dashboard.schema";
import { GetDashboardByIdSchema } from "./schema/get-dashboard-by-id.schema";

export default async function (app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.get(
    "/",
    { schema: { security: [{ authorization: [] }] } },
    async (request, response) => {
      const jwtPayload = request.user;
      const list = await app.prisma.linkUserToDashboard.findMany({
        where: { userId: jwtPayload.userId },
        include: {
          dashboard: true,
        },
        take: 100,
      });
      if (list.length <= 0) {
        response.code(404);
        throw new Error("Данные по запросу не найдены");
      }
      return list;
    }
  );
  app.get(
    "/:id",
    {
      schema: {
        params: GetDashboardByIdSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Params: Static<typeof GetDashboardByIdSchema>;
      }>,
      response
    ) => {
      const payload = request.params;
      const result = await app.prisma.dashboard.findFirst({
        where: { id: payload.id },
      });
      if (!result) {
        response.code(404);
        throw new Error("Данные по запросу не найдены");
      }
      return result;
    }
  );
  app.post(
    "/",
    {
      schema: {
        body: CreateDashboardSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{ Body: Static<typeof CreateDashboardSchema> }>
    ) => {
      // TODO: Нужно сделать что бы возврашались дашборды только тем кто на них подписан
      const payload = request.body;
      const jwtPayload = request.user;
      const create = await app.prisma.dashboard.create({
        data: {
          name: payload.name,
          description: payload.description,
          users: {
            create: {
              userId: jwtPayload.userId,
            },
          },
        },
      });
      return create;
    }
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: DeleteDashboardSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{ Params: Static<typeof DeleteDashboardSchema> }>
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
