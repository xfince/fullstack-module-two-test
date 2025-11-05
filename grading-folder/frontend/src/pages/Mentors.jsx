import { useState, useEffect } from 'react';
import axios from 'axios';
import MentorCard from '../components/MentorCard';
const API_URL = import.meta.env.VITE_API_URL;
const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mentors.filter((mentor) =>
        mentor.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(mentors);
    }
  }, [searchTerm, mentors]);

  const fetchMentors = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/mentors`);
      setMentors(res.data);
      setFilteredMentors(res.data);
    } catch (err) {
      setError('Failed to load mentors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-xl">Loading mentors...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Mentor</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by skill (e.g., JavaScript, Python, Design...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {filteredMentors.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">No mentors found</p>
          {searchTerm && (
            <p className="mt-2">Try adjusting your search criteria</p>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mentors;
