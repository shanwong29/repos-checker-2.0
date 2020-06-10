import express from "express";
import { GraphQLClient } from "graphql-request";
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://shanwong29.github.io"], // <== the URL of deployed React app
  })
);

app.use(express.json());

const endPoint = "https://api.github.com/graphql";

const client = new GraphQLClient(endPoint, {
  headers: { Authorization: `Bearer ${process.env.GITHUB_API_KEY}` },
});

app.post("/api", async (req, res, next) => {
  try {
    const data = await client.request(req.body.query, req.body.variables);
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
