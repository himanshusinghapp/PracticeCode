// const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user');
// const { userSchema } = require('../validation/validation');
// const Joi = require('@hapi/joi');

// module.exports = [
//   {
//     method: 'POST',
//     path: '/user',
//     handler: createUser
//   },
//   {
//     method: 'GET',
//     path: '/user',
//     handler: getUsers
//   },
//   {
//     method: 'GET',
//     path: '/user/{id}',
//     handler: getUserById
//   },
//   {
//     method: 'PUT',
//     path: '/user/{id}',
//     handler: updateUser
//   },
//   {
//     method: 'DELETE',
//     path: '/user/{id}',
//     handler: deleteUser
//   }
// ];

const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user');
const { userSchema } = require('../validation/validation');
const Joi = require('@hapi/joi');

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: createUser,
    options: {
      validate: {
        payload: userSchema,
        failAction: (request, h, error) => {
          return h.response({ error: error.details[0].message }).code(400).takeover();
        }
      }
    }
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
    handler: updateUser,
    options: {
      validate: {
        payload: userSchema,
        failAction: (request, h, error) => {
          return h.response({ error: error.details[0].message }).code(400).takeover();
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: deleteUser
  }
];
