import { createServer } from "http";

// imagine this is from a .env file
const PORT = 3000;
const HOSTNAME = "0.0.0.0";
const FORCAST_API_URL = "https://api.open-meteo.com/v1/forecast";

const server = createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Test" }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server
  .listen(PORT, HOSTNAME, () => {
    console.log(`Server listening on ${HOSTNAME}:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
