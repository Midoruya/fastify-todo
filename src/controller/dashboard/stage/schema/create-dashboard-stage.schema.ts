import { Type } from "@sinclair/typebox";

export const CreateDashboardStageSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  dashboardId: Type.Integer(),
});
