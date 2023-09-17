import { Type } from "@sinclair/typebox";

export const CreateDashboardSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
});
