import { createRouter } from "../services/trpc";
import { organizationsRouter } from "./organizations/router";

export const baseRouter = createRouter().merge(
  "organizations.",
  organizationsRouter
);

export type BaseRouter = typeof baseRouter;
