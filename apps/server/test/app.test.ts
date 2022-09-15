import { expect, test } from "vitest";

import { app as build } from "../app";

// Example @see https://github.com/vitest-dev/vitest/blob/main/examples/fastify/test/app.test.ts
test("with HTTP injection", async () => {
  const app = await build();
  console.log(app.config.get("Database.name"));
  const response = await app.inject({
    method: "GET",
    url: "/api/organizations",
  });

  expect(response.statusCode).toBe(200);
});
