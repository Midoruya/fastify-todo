import { Type } from "@sinclair/typebox";

export const CreateDashboardTaskSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  stageId: Type.Integer(),
  dashboardId: Type.Integer(),
});
