const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user');

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: createUser
  },
  {
    method: 'GET',
    path: '/user',
    handler: getUsers
  },
  {
    method: 'GET',
    path: '/user/{id}',
    handler: getUserById
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: updateUser
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: deleteUser
  }
];