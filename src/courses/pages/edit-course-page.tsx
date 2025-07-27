import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { courseService } from '../services/course-service';
import { CourseForm } from '../components/course-form';
import { type CreateCourseData } from '../schemas/course-schemas';
import { type Course } from '../types/course';
import { LoadingSpinner } from '../../shared/components/loading-spinner';
import { ErrorState } from '../../shared/components/error-state';
import { Tab } from '../../shared/components/layout/tab/tab';
import { useTab } from '../../shared/components/layout/tab/use-tab';

const tabs = [
  { id: 'modules', label: 'Modules', count: 0 },
  { id: 'resources', label: 'Resources', count: 0 },
];

function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { activeTab, setActiveTab } = useTab({ tabs, initialTab: 'modules' });

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Course Information
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Provide the essential information about your course
              </p>
            </div>

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
              submitText="Save Changes"
            />
          </div>

          <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
            <div>
              {activeTab === 'modules' && <div>Modules</div>}
              {activeTab === 'resources' && <div>Resources</div>}
            </div>
          </Tab>
        </div>
      </div>
    </div>
  );
}

export default EditCoursePage;
