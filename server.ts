import "dotenv/config";
import { Client } from "pg";
import express from "express";
import waitOn from "wait-on";
import onExit from "signal-exit";
import cors from "cors";

// Add your routes here
const setupApp = (client: Client): express.Application => {
  const app: express.Application = express();

  app.use(cors());

  app.use(express.json());

  app.get("/components", async (_req, res) => {
    const { rows } = await client.query(`SELECT * FROM components`);
    res.json(
      rows
        .map((row) => ({
          ...row,
          margin: JSON.parse(row.margin),
          padding: JSON.parse(row.padding),
        }))
        .sort((a, b) => a.id - b.id)
    );
  });

  app.put("/update/margin", async (req, res) => {
    const { id, margin } = req.body;
    if (margin) {
      const { rows } = await client.query(
        `UPDATE components SET margin = $1 WHERE id = $2 RETURNING *`,
        [margin, id]
      );
      res.json(rows);
      return;
    }
  });

  app.put("/update/padding", async (req, res) => {
    const { id, padding } = req.body;
    if (padding) {
      const { rows } = await client.query(
        `UPDATE components SET padding = $1 WHERE id = $2 RETURNING *`,
        [padding, id]
      );
      res.json(rows);
      return;
    }
  });

  app.put("/update/width", async (req, res) => {
    const { id, width } = req.body;
    if (width) {
      const { rows } = await client.query(
        `UPDATE components SET width = $1 WHERE id = $2 RETURNING *`,
        [width, id]
      );
      res.json(rows);
      return;
    }
  });

  app.put("/update/height", async (req, res) => {
    const { id, height } = req.body;
    if (height) {
      const { rows } = await client.query(
        `UPDATE components SET height = $1 WHERE id = $2 RETURNING *`,
        [height, id]
      );
      res.json(rows);
      return;
    }
  });

  return app;
};

// Waits for the database to start and connects
const connect = async (): Promise<Client> => {
  console.log("Connecting");
  const resource = `tcp:${process.env.PGHOST}:${process.env.PGPORT}`;
  console.log(`Waiting for ${resource}`);
  await waitOn({ resources: [resource] });
  console.log("Initializing client");
  const client = new Client();
  await client.connect();
  console.log("Connected to database");

  // Ensure the client disconnects on exit
  onExit(async () => {
    console.log("onExit: closing client");
    await client.end();
  });

  return client;
};

const main = async () => {
  if (!process.env.SERVER_PORT) return;
  const client = await connect();
  const app = setupApp(client);
  const port = parseInt(process.env.SERVER_PORT);
  app.listen(port, () => {
    console.log(
      `Draftbit Coding Challenge is running at http://localhost:${port}/`
    );
  });
};

main();
