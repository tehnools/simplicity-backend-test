import { describe, expect, it } from "vitest";

import { makeRequest } from "./makeRequest";

describe("HTTP Server", () => {
  const BASE_URL = "http://localhost:3000";

  it("should return 200 and correct message on GET /", async () => {
    const response = await makeRequest(BASE_URL, "/");
    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual({ message: "Test" });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await makeRequest(BASE_URL, "/unknown");
    expect(response.statusCode).toBe(404);
  });
});
