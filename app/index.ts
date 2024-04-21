import Express from "express";
import os from "os";
import { config } from "dotenv";

config();

const app = Express();

const PORT = process.env.PORT || 3000;

const currDir = process.cwd();

app.get("/bundle.js", (req, res) => {
  res.sendFile(currDir + "/public/build/bundle.js");
});

app.get("/bundle.css", (req, res) => {
  res.sendFile(currDir + "/public/build/bundle.css");
});

app.get("/", (req, res) => {
  res.sendFile(currDir + "/public/index.html");
});

app.get("/*", (req, res) => {
  res.sendFile(currDir + "/public/index.html");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3080");
});
