import express from "express";
import { GraphQLClient } from "graphql-request";
import { graphqlQueries } from "./graphqlQuery/query";
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const deployedSite = "https://shanwong29.github.io";

const app: express.Application = express();

app.use(
  cors({
    credentials: true,
    origin: [deployedSite],
  })
);

app.use(express.json());

const endPoint = "https://api.github.com/graphql";

const client = new GraphQLClient(endPoint, {
  headers: { Authorization: `Bearer ${process.env.GITHUB_API_KEY}` },
});

app.post("/api", async (req, res, next) => {
  if (!req.body.queryType) {
    return;
  }

  const type = req.body.queryType as string;
  const query = graphqlQueries[type];
  try {
    const data = await client.request(query, req.body.variables);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.get("/", (req, res) => {
  res.send("repos-checker-server");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
