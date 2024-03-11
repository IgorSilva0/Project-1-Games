import express from "express";
import { pool } from "./db/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.json());

// using middleware to log requests
app.use((req, res, next) => {
  console.log(`Method : ${req.method}, Path : ${req.path}`);
  next();
});

app.get("/test", async (req, res) => {
  console.log("Working");
  const data = await pool.query(
    "SELECT * FROM users INNER JOIN score ON users.user_id = score.user_id WHERE score.game_id = 1"
  );
  res.send({ success: true, payload: data.rows });
});

// Server listen to a port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
