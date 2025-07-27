import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  createCourseSchema,
  type CreateCourseData,
} from '../schemas/course-schemas';
import clsx from 'clsx';

interface Props {
  initialData?: Partial<CreateCourseData>;
  onSubmit: (data: CreateCourseData) => Promise<void>;
  submitText?: string;
  loading?: boolean;
}

export function CourseForm({
  initialData = {},
  onSubmit,
  submitText = 'Create Course',
  loading = false,
}: Props) {
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      {/* Course Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Course Title
        </label>
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
  );
}
