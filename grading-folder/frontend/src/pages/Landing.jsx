import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Connect with Expert Mentors
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            MentorLink helps you find experienced mentors to guide your career
            and personal growth. Join our community today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/mentors"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Find a Mentor
            </Link>
            <Link
              to="/signup"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your account as a mentor or mentee
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Mentors</h3>
              <p className="text-gray-600">
                Search and filter mentors by skills and expertise
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Reach out and start your mentorship journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MentorLink */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose MentorLink
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            We connect you with vetted, experienced mentors across industries.
            Flexible scheduling, secure communication, and personalized matches
            help you grow faster.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-md">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-3.866-3.582-7-8-7v12a8 8 0 0016 0V4c-4.418 0-8 3.134-8 7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Vetted Experts</h3>
              <p className="text-gray-600 text-sm">
                Mentors go through a verification process to ensure expertise
                and reliability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-md">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 17l4-4 4 4M12 13v8"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Personalized Matches</h3>
              <p className="text-gray-600 text-sm">
                Get matched with mentors based on goals, skills, and
                availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-md">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.385 18.385A9 9 0 1118 21"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Book sessions that fit your calendar with built-in scheduling
                tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-md">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h4l3 9 4-18 3 9h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                We prioritize privacy and secure communication between mentors
                and mentees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white rounded-md px-3 py-2 font-bold">
                ML
              </div>
              <div>
                <h4 className="font-semibold">MentorLink</h4>
                <p className="text-sm text-gray-500">Connect. Learn. Grow.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex flex-col">
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Link>
                <Link
                  to="/careers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Careers
                </Link>
              </div>
              <div className="flex flex-col">
                <Link to="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy
                </Link>
                <Link to="/help" className="text-gray-600 hover:text-gray-900">
                  Help
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MentorLink. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                aria-label="Twitter"
                href="#"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0021 4.6a8.1 8.1 0 01-2.3.6 4 4 0 001.8-2.2 8.2 8.2 0 01-2.6 1 4.1 4.1 0 00-7 3.7 11.6 11.6 0 01-8.4-4.3 4.1 4.1 0 001.3 5.5A4 4 0 012 9.7v.1A4.1 4.1 0 004 13a4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.3 8.3 0 012 18.5a11.7 11.7 0 006 1.8" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn"
                href="#"
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5a2.3 2.3 0 11.01 4.6 2.3 2.3 0 01-.01-4.6zM3 8.98h4v12H3zM9 8.98h3.7v1.7h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V21H9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
