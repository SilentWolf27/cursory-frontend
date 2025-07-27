import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  createCourseSchema,
  type CreateCourseData,
} from '../schemas/course-schemas';
import { courseService } from '../services/course-service';
import { Modal } from '../../shared/components/modal/modal';
import { GenerateCourseForm } from './generate-course-form';
import clsx from 'clsx';

interface Props {
  initialData?: Partial<CreateCourseData>;
  onSubmit: (data: CreateCourseData) => Promise<void>;
  submitText?: string;
  loading?: boolean;
  isNewCourse?: boolean;
}

export function CourseForm({
  initialData = {},
  onSubmit,
  submitText = 'Create Course',
  loading = false,
  isNewCourse = false,
}: Props) {
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateCourseData>({
    resolver: zodResolver(createCourseSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      slug: initialData.slug || '',
      visibility: initialData.visibility || 'PRIVATE',
      tags: initialData.tags || [],
    },
  });

  const handleFormSubmit = async (data: CreateCourseData) => {
    const formData = {
      ...data,
      tags,
    };
    await onSubmit(formData);
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleOpenAIModal = () => setIsAIModalOpen(true);

  const handleCloseAIModal = () => setIsAIModalOpen(false);

  const handleGenerateCourse = async (data: any) => {
    try {
      setIsGenerating(true);

      const generateData = {
        description: data.topic,
        objective: data.expectedOutcome,
        difficulty: data.difficultyLevel.toLowerCase(),
      };

      const generatedCourse = await courseService.generateCourse(generateData);

      const generatedTags = generatedCourse.tags.map(tag =>
        tag.toLocaleLowerCase().trim()
      );
      setValue('title', generatedCourse.title);
      setValue('description', generatedCourse.description);
      setValue('slug', generatedCourse.slug);
      setValue('visibility', generatedCourse.visibility);
      setValue('tags', generatedTags || []);

      setTags(generatedTags || []);

      await trigger();

      handleCloseAIModal();
    } catch (error) {
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6"
      >
        {/* Course Title */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-900"
            >
              Course Title
            </label>
            {isNewCourse && (
              <button
                type="button"
                onClick={handleOpenAIModal}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 13L7.28446 14.5689C7.54995 15.0999 7.68269 15.3654 7.86003 15.5954C8.01739 15.7996 8.20041 15.9826 8.40455 16.14C8.63462 16.3173 8.9001 16.4501 9.43108 16.7155L11 17.5L9.43108 18.2845C8.9001 18.5499 8.63462 18.6827 8.40455 18.86C8.20041 19.0174 8.01739 19.2004 7.86003 19.4046C7.68269 19.6346 7.54995 19.9001 7.28446 20.4311L6.5 22L5.71554 20.4311C5.45005 19.9001 5.31731 19.6346 5.13997 19.4046C4.98261 19.2004 4.79959 19.0174 4.59545 18.86C4.36538 18.6827 4.0999 18.5499 3.56892 18.2845L2 17.5L3.56892 16.7155C4.0999 16.4501 4.36538 16.3173 4.59545 16.14C4.79959 15.9826 4.98261 15.7996 5.13997 15.5954C5.31731 15.3654 5.45005 15.0999 5.71554 14.5689L6.5 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 2L16.1786 5.06442C16.4606 5.79765 16.6016 6.16426 16.8209 6.47264C17.0153 6.74595 17.254 6.98475 17.5274 7.17909C17.8357 7.39836 18.2024 7.53937 18.9356 7.82138L22 9L18.9356 10.1786C18.2024 10.4606 17.8357 10.6016 17.5274 10.8209C17.254 11.0153 17.0153 11.254 16.8209 11.5274C16.6016 11.8357 16.4606 12.2024 16.1786 12.9356L15 16L13.8214 12.9356C13.5394 12.2024 13.3984 11.8357 13.1791 11.5274C12.9847 11.254 12.746 11.0153 12.4726 10.8209C12.1643 10.6016 11.7976 10.4606 11.0644 10.1786L8 9L11.0644 7.82138C11.7976 7.53937 12.1643 7.39836 12.4726 7.17909C12.746 6.98475 12.9847 6.74595 13.1791 6.47264C13.3984 6.16426 13.5394 5.79765 13.8214 5.06442L15 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Generate with AI
              </button>
            )}
          </div>
          <input
            {...register('title')}
            type="text"
            id="title"
            autoComplete="off"
            placeholder="Enter an engaging course title..."
            className={clsx(
              'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              errors.title &&
                'border-red-300 focus:ring-red-500 focus:border-red-500'
            )}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            autoComplete="off"
            placeholder="Describe what students will learn in this course..."
            className={clsx(
              'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
              errors.description &&
                'border-red-300 focus:ring-red-500 focus:border-red-500'
            )}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Slug and Visibility Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              URL
            </label>
            <input
              {...register('slug')}
              type="text"
              id="slug"
              autoComplete="off"
              placeholder="course-url-slug"
              className={clsx(
                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                errors.slug &&
                  'border-red-300 focus:ring-red-500 focus:border-red-500'
              )}
            />
            {errors.slug && (
              <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label
              htmlFor="visibility"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Visibility
            </label>
            <select
              {...register('visibility')}
              id="visibility"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="PRIVATE">Private - Invitation only</option>
              <option value="PUBLIC">Public - Anyone can see it</option>
            </select>
            {errors.visibility && (
              <p className="text-red-600 text-sm mt-1">
                {errors.visibility.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Tags
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Add relevant tags to help students find your course
          </p>

          {/* Tag Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyPress}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim()}
              className="px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>

          {/* Tags Display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 justify-start">
          <button
            type="submit"
            disabled={!isValid || loading}
            className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              </div>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>

      {/* AI Generation Modal */}
      <Modal
        isOpen={isAIModalOpen}
        onClose={handleCloseAIModal}
        title="Generar Curso con IA"
        size="full"
      >
        <GenerateCourseForm
          onSubmit={handleGenerateCourse}
          loading={isGenerating}
        />
      </Modal>
    </>
  );
}
