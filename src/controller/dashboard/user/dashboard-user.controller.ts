import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetUserDashboardSchema } from "./schema/get-user-dashboard.schema";
import { AddUserDashboardSchema } from "./schema/add-user-dashboard.schema copy";
import { DeleteUserDashboardSchema } from "./schema/delete-user-dashboard.schema copy";
import { Static } from "@sinclair/typebox";

export default async function (app: FastifyInstance) {
  console.log("dashboard user");
  app.get(
    "/:id",
    {
      schema: {
        params: GetUserDashboardSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{ Params: Static<typeof GetUserDashboardSchema> }>
    ) => {
      const payload = request.params;
      return await app.prisma.linkUserToDashboard.findMany({
        where: {
          dashboardId: payload.id,
        },
        select: {
          id: true,
          userId: true,
          dashboardId: true,
          user: {
            select: {
              password: false,
              name: true,
            },
          },
          dashboard: true,
        },
      });
    }
  );
  app.post(
    "/",
    {
      schema: {
        body: AddUserDashboardSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{ Body: Static<typeof AddUserDashboardSchema> }>,
      response: FastifyReply
    ) => {
      const payload = request.body;
      try {
        await app.prisma.linkUserToDashboard.create({
          data: {
            userId: payload.userId,
            dashboardId: payload.dashboardId,
          },
        });
        return "Пользователь успешно добавлен";
      } catch (e) {
        response.code(400);
        throw new Error("Ошибка добавления пользователя к дашборду");
      }
    }
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: DeleteUserDashboardSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Params: Static<typeof DeleteUserDashboardSchema>;
      }>,
      response: FastifyReply
    ) => {
      const payload = request.params;
      try {
        await app.prisma.linkUserToDashboard.delete({
          where: {
            id: payload.id,
          },
        });
        return "Пользователь успешно удален";
      } catch (e) {
        response.code(400);
        throw new Error("Ошибка удаление пользователя");
      }
    }
  );
}
