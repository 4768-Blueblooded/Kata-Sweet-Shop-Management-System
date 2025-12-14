const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sweets", require("./routes/sweets"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sales", require("./routes/sales"));

app.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = app;
