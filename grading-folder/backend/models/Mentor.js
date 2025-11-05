const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio'],
    maxlength: 500
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  skills: [{
    type: String,
    required: true
  }],
  links: {
    linkedin: String,
    github: String,
    website: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
