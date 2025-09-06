import fastify from "fastify";
import FastifyVite from "@fastify/vite";

export const serverFactory = async () => {
  const server = fastify();

  await server.register(FastifyVite, {
    root: import.meta.dirname, // where to look for vite.config.js
    dev: process.argv.includes("--dev"),
    spa: true,
  });

  return server;
};
