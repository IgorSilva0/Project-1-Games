import { pool } from "./index.js";

async function resetDatabase() {
  try {
    // Delete tables below if they exist
    await pool.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS game CASCADE;
            DROP TABLE IF EXISTS score CASCADE;
        `);

    // Create new table for users
    await pool.query(`
            CREATE TABLE users (
                user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                img TEXT
            );
        `);
    // Create new table for games
    await pool.query(`
            CREATE TABLE game (
                game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

    // Create new table for scores
    await pool.query(`
            CREATE TABLE score (
                game_id INT REFERENCES game(game_id),
                user_id INT REFERENCES users(user_id),
                score INT DEFAULT 0
            );
        `);
    // Seed every table
    // user
    await pool.query(`
            INSERT INTO users (name, img)
            VALUES ('Igor Silva','https://i.imgur.com/r1mYK7m.jpeg'),
            ('Clara','https://i.imgur.com/r1mYK7m.jpeg'),
            ('Zoe','https://i.imgur.com/r1mYK7m.jpeg')
    `);
    // games
    await pool.query(`
            INSERT INTO game (name)
            VALUES ('Rock paper scissors'),
                   ('Black Jack')
    `);
    // score
    await pool.query(`
            INSERT INTO score (game_id, user_id, score)
            VALUES (1, 1, 5),
                   (2, 1, 10),
                   (1, 2, 50),
                   (1, 3, 100)
    `);
    console.log(`Database reset successful`);
  } catch (err) {
    console.log(`Database reset failed: ${err}`);
  } finally {
    await pool.end();
  }
}

await resetDatabase();
