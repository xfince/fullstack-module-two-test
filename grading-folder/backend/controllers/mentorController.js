const Mentor = require('../models/Mentor');
const User = require('../models/User');

exports.getAllMentors = async (req, res) => {
  try {
    const { skill } = req.query;
    let query = { isActive: true };

    if (skill) {
      query.skills = { $regex: skill, $options: 'i' };
    }

    const mentors = await Mentor.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate('user', 'name email');
    
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyMentorProfile = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ user: req.user._id }).populate('user', 'name email');
    
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMentorProfile = async (req, res) => {
  try {
    const { bio, image, skills, links } = req.body;

    const mentor = await Mentor.findOne({ user: req.user._id });

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    mentor.bio = bio || mentor.bio;
    mentor.image = image || mentor.image;
    mentor.skills = skills || mentor.skills;
    mentor.links = links || mentor.links;

    const updatedMentor = await mentor.save();
    await updatedMentor.populate('user', 'name email');

    res.json(updatedMentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMentorProfile = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ user: req.user._id });

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    mentor.isActive = false;
    await mentor.save();

    res.json({ message: 'Mentor profile deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
