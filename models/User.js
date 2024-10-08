const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); // Import the dateFormat utility

// Define Reaction schema (used as a subdocument in Thought)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Automatically generate an ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Max length of 280 characters
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the timestamp when created
      get: (timestamp) => dateFormat(timestamp), // Use the getter to format the date
    },
  },
  {
    toJSON: {
      getters: true, // Enable the use of the getter function
    },
    id: false, // Disable default 'id' field
  }
);

// Define the Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp), // Use the dateFormat utility here as well
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Reactions are subdocuments stored in the array
  },
  {
    toJSON: {
      virtuals: true, // Enable virtuals (like reactionCount)
      getters: true,  // Enable getters to format timestamps
    },
    id: false, // Disable default 'id' field
  }
);

// Virtual property to calculate the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
