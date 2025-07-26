import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  createCourseSchema,
  type CreateCourseData,
} from '../schemas/course-schemas';
import { courseService } from '../services/course-service';
import clsx from 'clsx';

function CreateCoursePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateCourseData>({
    resolver: zodResolver(createCourseSchema),
    mode: 'onChange',
    defaultValues: {
      tags: [],
    },
  });

  const watchedTitle = watch('title');
  const watchedSlug = watch('slug');

  const onSubmit = async (data: CreateCourseData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const course = await courseService.createCourse(data);

      // Redirect to the new course page
      navigate(`/courses/${course.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={handleCancel}
              className="mr-6 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white/50"
            >
              <svg
                className="w-6 h-6"
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
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Your Course
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your expertise with the world. Create a structured learning
            experience that helps others grow.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* Course Title - Hero Field */}
            <div className="mb-10">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                What's your course about?
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                autoComplete="off"
                placeholder="e.g., Master Arduino Programming from Zero to Hero"
                className={clsx(
                  'w-full px-6 py-4 text-base border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50',
                  errors.title &&
                    'border-red-300 focus:ring-red-100 focus:border-red-500'
                )}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Course Description */}
            <div className="mb-10">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Describe what students will learn
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                autoComplete="off"
                placeholder="In this course, students will learn the fundamentals of Arduino programming, including digital and analog I/O, sensors, actuators, and building complete projects from scratch..."
                className={clsx(
                  'w-full px-6 py-4 text-sm border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none bg-white/50',
                  errors.description &&
                    'border-red-300 focus:ring-red-100 focus:border-red-500'
                )}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* URL Slug with Live Preview */}
            <div className="mb-10">
              <label
                htmlFor="slug"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Course URL
              </label>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm font-mono">
                  cursory.com/courses/
                </span>
                <input
                  {...register('slug')}
                  type="text"
                  id="slug"
                  autoComplete="off"
                  placeholder="arduino-programming-zero-to-hero"
                  className={clsx(
                    'flex-1 px-3 py-2.5 text-sm border-2 border-gray-200 rounded-r-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 font-mono bg-white/50',
                    errors.slug &&
                      'border-red-300 focus:ring-red-100 focus:border-red-500'
                  )}
                />
              </div>

              {errors.slug && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Visibility Selection */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Who can access this course?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="group relative flex cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                  <input
                    {...register('visibility')}
                    type="radio"
                    value="PUBLIC"
                    className="sr-only"
                  />
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-500 group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500 transition-all duration-200">
                        <div className="w-3 h-3 bg-white rounded-full opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-lg font-semibold text-gray-900 group-has-[:checked]:text-blue-900">
                          Public
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 group-has-[:checked]:text-blue-700">
                        Anyone can discover and enroll in your course
                      </p>
                    </div>
                  </div>
                </label>
                <label className="group relative flex cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                  <input
                    {...register('visibility')}
                    type="radio"
                    value="PRIVATE"
                    className="sr-only"
                  />
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-500 group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500 transition-all duration-200">
                        <div className="w-3 h-3 bg-white rounded-full opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-500 mr-2 group-has-[:checked]:text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-lg font-semibold text-gray-900 group-has-[:checked]:text-blue-900">
                          Private
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 group-has-[:checked]:text-blue-700">
                        Only you and invited users can access
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {errors.visibility && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.visibility.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="mb-10">
              <label
                htmlFor="tags"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Add tags to help others discover your course
              </label>
              <input
                {...register('tags', {
                  setValueAs: (value: string) => {
                    if (!value) return [];

                    if (Array.isArray(value)) return value;

                    return value
                      .split(',')
                      .map(tag => tag.trim().toLowerCase())
                      .filter(tag => tag.length > 0);
                  },
                })}
                type="text"
                id="tags"
                autoComplete="off"
                placeholder="arduino, electronics, programming, sensors, IoT"
                className={clsx(
                  'w-full px-6 py-4 text-sm border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/50',
                  errors.tags &&
                    'border-red-300 focus:ring-red-100 focus:border-red-500'
                )}
              />
              {errors.tags && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.tags.message}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                Separate tags with commas. These help students find your course.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
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

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={clsx(
                  'flex-1 sm:flex-none px-8 py-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white transition-all duration-200',
                  isValid && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-105'
                    : 'bg-gray-400 cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating your course...
                  </div>
                ) : (
                  'Create Course'
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-300 rounded-xl shadow-sm text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCoursePage;
