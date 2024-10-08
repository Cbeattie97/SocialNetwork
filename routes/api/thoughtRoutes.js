const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)  // GET all thoughts
  .post(createThought); // POST a new thought

// /api/thoughts/:id
router.route('/:id')
  .get(getThoughtById)    // GET a single thought by ID
  .put(updateThought)     // PUT to update a thought by ID
  .delete(deleteThought); // DELETE a thought by ID

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);     // POST to create a reaction to a thought

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // DELETE a reaction by reactionId

module.exports = router;
