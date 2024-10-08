const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getAllUsers)  // GET all users
  .post(createUser); // POST a new user

// /api/users/:id
router.route('/:id')
  .get(getUserById)    // GET a single user by ID
  .put(updateUser)     // PUT to update a user by ID
  .delete(deleteUser); // DELETE a user by ID

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)      // POST to add a friend to user's friend list
  .delete(removeFriend); // DELETE to remove a friend from user's friend list

module.exports = router;
