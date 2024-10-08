const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); // You can use dayjs or any other date formatting utility

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
      default: Date.now,
      get: timestamp => dateFormat(timestamp), // Formats the timestamp using the dateFormat utility
    },
  },
  {
    toJSON: {
      getters: true, // Enable getters so the createdAt field uses the custom formatting
    },
    id: false, // Disable the default 'id' field
  }
);

// Define the Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280, // Enforces a max character limit
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp), // Formats the date
    },
    username: {
      type: String,
      required: true, // The user who posted the thought
    },
    reactions: [reactionSchema], // Array of subdocuments (reactions)
  },
  {
    toJSON: {
      virtuals: true, // Enable virtuals to use the reactionCount field
      getters: true,  // Enable getters to format timestamps
    },
    id: false, // Disable default 'id' field
  }
);

// Virtual property to calculate the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

