const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/queries');

module.exports = {
  createUser: async (request, h) => {
    try {
      const { username, email } = request.payload;
      const user = await createUser(username, email);
      return h.response(user).code(201);
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  getUsers: async (request, h) => {
    try {
      const user = await getUsers();
      return user;
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  getUserById: async (request, h) => {
    try {
      const { id } = request.params;
      const user = await getUserById(id);
      if(!user) {
        return h.response({ error: 'User not found' }).code(404);
      }
      return user;
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  updateUser: async (request, h) => {
    try {
      const { id } = request.params;
      const { username, email } = request.payload;
      const user = await updateUser(id, username, email);
      if (!user) {
        return h.response({ error: 'User not found' }).code(404);
      }
      return user;
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  deleteUser: async (request, h) => {
    try {
      const { id } = request.params;
      const user = await deleteUser(id);
      if (!user) {
        return h.response({ error: 'User not found' }).code(404);
      }
      return { message: 'User deleted successfully' };
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
  }
};

