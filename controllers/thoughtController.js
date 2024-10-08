const { Thought, User } = require('../models');

// Controller for thought operations
const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  
  // GET a single thought by ID
  getThoughtById(req, res) {
    Thought.findById(req.params.id)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  
  // POST a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  // PUT to update a thought by ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  
  // DELETE a thought
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then((thought) => {
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  
  // POST to add a reaction
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  
  // DELETE to remove a reaction
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
