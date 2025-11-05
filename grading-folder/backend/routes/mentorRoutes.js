const express = require('express');
const {
  getAllMentors,
  getMentorById,
  getMyMentorProfile,
  updateMentorProfile,
  deleteMentorProfile
} = require('../controllers/mentorController');
const { protect, mentorOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllMentors);
router.get('/me', protect, mentorOnly, getMyMentorProfile);
router.get('/:id', getMentorById);
router.put('/me', protect, mentorOnly, updateMentorProfile);
router.delete('/me', protect, mentorOnly, deleteMentorProfile);

module.exports = router;
