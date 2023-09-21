import { FastifyInstance, FastifyRequest } from "fastify";
import { Static } from "@sinclair/typebox";
import { CreateDashboardStageSchema } from "./schema/create-dashboard-stage.schema";
import { DeleteDashboardSchema } from "../schema/delete-dashboard.schema";
import { GetDashboardStageSchema } from "./schema/get-dashboard-stage.schema";

export default async function (app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);
  app.get(
    "/:id",
    {
      schema: {
        params: GetDashboardStageSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Params: Static<typeof GetDashboardStageSchema>;
      }>
    ) => {
      const payload = request.params;
      return await app.prisma.dashboardStage.findMany({
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
        body: CreateDashboardStageSchema,
        security: [{ authorization: [] }],
      },
    },
    async (
      request: FastifyRequest<{
        Body: Static<typeof CreateDashboardStageSchema>;
      }>
    ) => {
      const payload = request.body;
      return await app.prisma.dashboardStage.create({
        data: {
          dashboardId: payload.dashboardId,
          description: payload.description,
          name: payload.name,
        },
      });
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
      const payload = request.params;
      return await app.prisma.dashboardStage.delete({
        where: { id: payload.id },
      });
    }
  );
}
