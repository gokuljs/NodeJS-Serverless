import serverless from "serverless-http";
import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
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
