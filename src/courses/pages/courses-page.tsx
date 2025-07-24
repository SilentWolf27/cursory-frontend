import { useCourses } from '../hooks/use-courses';
import { LoadingSpinner } from '../../shared/components/loading-spinner';
import { ErrorState } from '../../shared/components/error-state';
import { EmptyState } from '../../shared/components/empty-state';

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
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          New Course
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {course.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.visibility === 'PUBLIC'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {course.visibility}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description}
            </p>

            {course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View course
              </button>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
