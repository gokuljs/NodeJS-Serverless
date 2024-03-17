import serverless from "serverless-http";
import express from "express";
import { neon } from "@neondatabase/serverless";

const app = express();

async function dbclient() {
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

app.get("/", async (req, res, next) => {
  const sql = await dbclient();
  const result = await sql`select now()`;
  return res.status(200).json({
    message: "Hello from root!",
    result,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// This is for serverful app
// app.listen(3000, () => {
//   console.log("Server is running on port", 3000);
// });

export const handler = serverless(app);
