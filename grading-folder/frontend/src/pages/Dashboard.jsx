import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    bio: '',
    image: '',
    skills: [],
    links: {
      linkedin: '',
      github: '',
      website: ''
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/mentors/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setFormData({
        bio: res.data.bio,
        image: res.data.image,
        skills: res.data.skills,
        links: res.data.links || { linkedin: '', github: '', website: '' }
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('links.')) {
      const linkName = name.split('.')[1];
      setFormData({
        ...formData,
        links: { ...formData.links, [linkName]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map((s) => s.trim());
    setFormData({ ...formData, skills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/api/mentors/me`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Mentor Dashboard</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {success}
        </div>
      )}

      {editing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Profile Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="JavaScript, React, Node.js"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="links.linkedin"
                value={formData.links.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">GitHub URL</label>
              <input
                type="url"
                name="links.github"
                value={formData.links.github}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Website URL</label>
              <input
                type="url"
                name="links.website"
                value={formData.links.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start gap-6">
            <img
              src={profile?.image}
              alt={user?.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <p className="text-gray-600 mb-4">{profile?.bio}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Links:</h3>
                <div className="space-y-1">
                  {profile?.links?.linkedin && (
                    <div>
                      <span className="text-gray-600">LinkedIn: </span>
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.links.linkedin}
                      </a>
                    </div>
                  )}
                  {profile?.links?.github && (
                    <div>
                      <span className="text-gray-600">GitHub: </span>
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.links.github}
                      </a>
                    </div>
                  )}
                  {profile?.links?.website && (
                    <div>
                      <span className="text-gray-600">Website: </span>
                      <a
                        href={profile.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.links.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
