import { beforeAll, describe, expect, test } from "vitest";

import { app as build } from "../../app";
import { organizationFactory } from "../../services/knex/factories";

describe("organizations routes", () => {
  let app: Awaited<ReturnType<typeof build>>;

  beforeAll(async () => {
    app = await build();

    await app.knex("organizations").del();
  });

  test("GET /organizations", async () => {
    // Arrange
    const organizations = await organizationFactory.createList(5);

    // Act
    const { statusCode, payload } = await app.inject({
      method: "GET",
      url: "/api/organizations",
    });
    const jsonPayload = JSON.parse(payload) as Array<Record<string, unknown>>;

    // Assert
    expect(statusCode).toBe(200);
    expect(jsonPayload).toHaveLength(organizations.length);
    expect(jsonPayload).toEqual(expect.arrayContaining(organizations));
  });
});
