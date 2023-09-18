import { Type } from "@sinclair/typebox";

export const AddUserDashboardSchema = Type.Object({
  dashboardId: Type.Integer(),
  userId: Type.Number(),
});
