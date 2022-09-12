import { Type } from "@sinclair/typebox";

export const OrganizationSchema = Type.Object(
  {
    id: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.Optional(Type.String()),
    name: Type.String(),
  },
  { $id: "Organization" }
);
