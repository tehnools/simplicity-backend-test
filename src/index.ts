import { serverFactory } from "./server";

const server = await serverFactory();
const PORT = 3000;
const HOSTNAME = "0.0.0.0";

server.get("/", (_, reply) => {
  reply.send({ message: "Test" });
});

try {
  await server.listen({ port: PORT, host: HOSTNAME });
  console.log(`Server listening on port ${HOSTNAME}:${PORT}`);
} catch (err) {
  console.error("Error starting server:", err);
  process.exit(1);
}
