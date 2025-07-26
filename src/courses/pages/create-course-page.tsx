import { useState } from 'react';
import { useNavigate } from 'react-router';
import { type CreateCourseData } from '../schemas/course-schemas';
import { courseService } from '../services/course-service';
import { CourseForm } from '../components/course-form';

function CreateCoursePage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateCourseData) => {
    try {
      setIsSaving(true);
      setError(null);

      const course = await courseService.createCourse(data);

      navigate(`/cursos/${course.id}/editar`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Course
            </h1>
            <p className="text-gray-600 mt-2">
              Share your expertise with the world. Create a structured learning
              experience that helps others grow.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-400 mr-3 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-red-800 font-medium">
                    Something went wrong
                  </p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <CourseForm
            onSubmit={handleSubmit}
            loading={isSaving}
            submitText="Create Course"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateCoursePage;
