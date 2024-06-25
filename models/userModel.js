const pool = require('../config/db');

const createUser = async (username, password, email, role) => {
  const result = await pool.query(
    `INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *`,
    [username, password, email, role]
  );
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

module.exports = { createUser, getUserByUsername, getUserByEmail };
