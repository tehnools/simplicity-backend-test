import { FastifyInstance } from "fastify";
import { beforeAll, describe, expect, it } from "vitest";

import { serverFactory } from "./server";

describe("index", () => {
  let server: FastifyInstance;
  beforeAll(async () => {
    server = await serverFactory();
  });

  it("should be able to initialise server", () => {
    expect(server).toBeDefined();
  });

  describe("/", () => {
    it("should return 'Test' on GET /", () => {});
  });
});
