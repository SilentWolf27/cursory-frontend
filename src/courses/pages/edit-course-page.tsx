import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { courseService } from '../services/course-service';
import { CourseForm } from '../components/course-form';
import { type CreateCourseData } from '../schemas/course-schemas';
import { type Course } from '../types/course';
import { LoadingSpinner } from '../../shared/components/loading-spinner';
import { ErrorState } from '../../shared/components/error-state';

function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const courseData = await courseService.getCourseById(id);
      setCourse(courseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleSubmit = async (data: CreateCourseData) => {
    if (!id) return;

    try {
      setIsSaving(true);
      setError(null);

      const updatedCourse = await courseService.updateCourse(id, data);
      setCourse(updatedCourse);

      navigate('/cursos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate('/cursos');

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsSaving(true);
      setError(null);

      await courseService.deleteCourse(id);
      navigate('/cursos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !course)
    return <ErrorState title="Error loading course" message={error} />;

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="cursor-pointer flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                {isSaving ? 'Deleting...' : 'Delete Course'}
              </button>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
              <p className="text-gray-600 mt-2">
                Modify the details of your course "{course.title}"
              </p>
            </div>
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

          {/* Course Form */}
          <CourseForm
            initialData={{
              title: course.title,
              description: course.description,
              slug: course.slug,
              visibility: course.visibility,
              tags: course.tags || [],
            }}
            onSubmit={handleSubmit}
            loading={isSaving}
            submitText="Save"
          />
        </div>
      </div>
    </div>
  );
}

export default EditCoursePage;
