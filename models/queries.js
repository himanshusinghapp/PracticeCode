const pool = require('./config');

module.exports = {
  createUser: async (username, email) => {
    const result = await pool.query(
      'INSERT INTO users(username, email) VALUES($1, $2) RETURNING *',
      [username, email]
    );
    return result.rows[0];
  },

  getUsers: async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },

  getUserById: async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  updateUser: async (id, username, email) => {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
      [username, email, id]
    );
    return result.rows[0];
  },

  deleteUser: async (id) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    }
  };