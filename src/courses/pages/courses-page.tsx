import { useCourses } from '../hooks/use-courses';
import { LoadingSpinner } from '../../shared/components/loading-spinner';
import { ErrorState } from '../../shared/components/error-state';
import { EmptyState } from '../../shared/components/empty-state';
import { CourseCard } from '../components/course-card';
import { Link } from 'react-router';

function CoursesPage() {
  const { courses, loading, error, refetch } = useCourses();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading courses"
        message={error}
        onRetry={refetch}
      />
    );
  }

  if (courses.length === 0) {
    return (
      <EmptyState
        title="Ready to organize your knowledge?"
        description="Create your first course to start building your personal learning library. Structure your expertise into clear, shareable modules."
        actionText="Start organizing"
        actionHref="/cursos/crear"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="mt-2 text-gray-600">
                Organize and share your technical knowledge
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/cursos/crear"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Course
              </Link>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
