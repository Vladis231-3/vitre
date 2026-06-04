require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/submissions"));
app.use("/api/submissions", require("./routes/submissions"));
app.use("/api/services", require("./routes/services"));
app.use("/api/works", require("./routes/works"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/cities", require("./routes/cities"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/settings", require("./routes/settings"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
