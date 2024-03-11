import express from "express";
import { pool } from "./db/index.js";
import { addScore } from "./score.js";

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
  const data = await pool.query("SELECT * FROM score");
  // const data = await pool.query(
  //   "SELECT * FROM users INNER JOIN score ON users.user_id = score.user_id WHERE score.game_id = 1"
  // );
  res.send({ success: true, payload: data.rows });
});

// Post New Score
app.post("/scorerps/:userID", async (req, res) => {
  const { password } = req.query;
  if (password === "test") {
    const userID = req.params.userID;
    const data = await addScore(1, userID);
    if (data) {
      res.send({ success: true, message: "Score added!", payload: data });
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
