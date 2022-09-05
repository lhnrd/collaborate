import { z } from "zod";

declare module "objection" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ModelClass {
    static schema(): z.Schema;
  }
}
