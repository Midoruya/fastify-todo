import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";
import { GetDashboardTaskSchema } from "./schema/get-dashboard-task.schema";
import { CreateDashboardTaskSchema } from "./schema/create-dashboard-task.schema";
import { DeleteDashboardTask } from "./schema/delete-dashboard-task.schema";

export default async function (app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.get(
    "/:id",
    {
      schema: {
        params: GetDashboardTaskSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Params: Static<typeof GetDashboardTaskSchema>;
      }>
    ) => {
      const payload = request.params;
      return await app.prisma.dashboardTask.findMany({
        where: {
          dashboardId: payload.id,
        },
      });
    }
  );
  app.post(
    "/",
    {
      schema: {
        body: CreateDashboardTaskSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Body: Static<typeof CreateDashboardTaskSchema>;
      }>
    ) => {
      const payload = request.body;
      return await app.prisma.dashboardTask.create({
        data: {
          dashboardId: payload.dashboardId,
          name: payload.name,
          description: payload.description,
          dashboardStageId: payload.stageId,
        },
      });
    }
  );
  app.delete(
    "/:id",
    {
      schema: {
        params: DeleteDashboardTask,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{ Params: Static<typeof DeleteDashboardTask> }>
    ) => {
      const payload = request.params;
      return await app.prisma.dashboardTask.delete({
        where: {
          id: payload.id,
        },
      });
    }
  );
}
