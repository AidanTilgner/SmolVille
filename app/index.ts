import Express from "express";
import os from "os";
const app = Express();

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

app.listen(3080, () => {
  console.log("Server is running on port 3000");
});
