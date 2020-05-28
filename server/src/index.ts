import express from "express";
require("dotenv").config();
import { GraphQLClient } from "graphql-request";

const PORT = 5000;

const app: express.Application = express();

app.use(express.json());

const endPoint = "https://api.github.com/graphql";

export const client = new GraphQLClient(endPoint, {
  headers: { Authorization: `Bearer ${process.env.GITHUB_API_KEY}` },
});

app.post("/api", async (req, res, next) => {
  console.log(req.body, "test req.body");
  console.log(req.body.variables, "test req.body.variables");

  try {
    const data = await client.request(req.body.query, req.body.variables);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
