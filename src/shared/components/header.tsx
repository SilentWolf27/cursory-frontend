import { Link } from 'react-router';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Cursory</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-center sm:justify-end">
            <Link
              to="/courses"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Courses
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
