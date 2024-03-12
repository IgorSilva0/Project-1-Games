import { pool } from "./db/index.js";

// Add score to RPS game
export async function rpsScore(num, user) {
  const find = await pool.query(`SELECT * FROM users WHERE user_id = ${user}`);
  if (find) {
    await pool.query(
      `UPDATE score SET score = score+${num} WHERE game_id = 1 AND user_id = ${user}`
    );
  }
  return find.rows[0] || null;
}
