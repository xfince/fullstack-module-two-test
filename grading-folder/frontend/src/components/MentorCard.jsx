const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={mentor.image}
          alt={mentor.user?.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {mentor.user?.name}
          </h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{mentor.bio}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {mentor.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            {mentor.user?.email && (
              <a
                href={`mailto:${mentor.user.email}`}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              >
                Contact Mentor
              </a>
            )}
            {mentor.links?.linkedin && (
              <a
                href={mentor.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm py-2"
              >
                LinkedIn
              </a>
            )}
            {mentor.links?.github && (
              <a
                href={mentor.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm py-2"
              >
                GitHub
              </a>
            )}
            {mentor.links?.website && (
              <a
                href={mentor.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm py-2"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
