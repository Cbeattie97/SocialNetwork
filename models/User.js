const { Schema, model } = require('mongoose');

// User Schema definition
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Use Mongoose's built-in matching validation for email
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Virtual to retrieve the friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

module.exports = User;
