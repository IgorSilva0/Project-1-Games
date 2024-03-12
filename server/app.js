import express from "express";
import { pool } from "./db/index.js";
import { rpsScore } from "./body.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("../public"));
app.use(express.json());

// using middleware to log requests
app.use((req, res, next) => {
  console.log(`Method : ${req.method}, Path : ${req.path}`);
  next();
});

app.get("/test", async (req, res) => {
  const data = await pool.query("SELECT * FROM score");
  // const data = await pool.query(
  //   "SELECT * FROM users INNER JOIN score ON users.user_id = score.user_id WHERE score.game_id = 1"
  // );
  res.send({ success: true, payload: data.rows });
});

// Get all top3 score rank
app.get("/top3", async (req, res) => {
  const data = await pool.query(
    "SELECT * FROM score INNER JOIN users ON users.user_id = score.user_id ORDER BY score DESC LIMIT 3"
  );
  res.send({ success: true, payload: data.rows });
});

// Increase Score
app.put("/scorerps/:userID", async (req, res) => {
  const { k } = req.query;
  if (k === "8*ej1^3d9K:J4zn136") {
    const userID = req.params.userID;
    const data = await rpsScore(1, userID);
    if (data) {
      res
        .status(201)
        .send({ success: true, message: "Score added!", payload: data });
      return;
    } else {
      res.send({ success: false, message: "Player not found!" });
      return;
    }
  }
  res.send({ success: false, message: "Wrong password!" });
  return;
});

// Server listen to a port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
