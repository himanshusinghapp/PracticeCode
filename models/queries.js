const pool = require('./config');

module.exports = {
  createUser: async (name, email) => {
    const result = await pool.query(
      'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
      [name, email]
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

  updateUser: async (id, name, email) => {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
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