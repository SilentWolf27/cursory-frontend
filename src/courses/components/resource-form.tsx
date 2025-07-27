import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createResourceSchema,
  type CreateResourceData,
} from '../schemas/resource-schemas';
import clsx from 'clsx';

interface Props {
  initialData?: Partial<CreateResourceData>;
  onSubmit: (data: CreateResourceData) => Promise<void>;
  submitText?: string;
  loading?: boolean;
}

export function ResourceForm({
  initialData = {},
  onSubmit,
  submitText = 'Add Resource',
  loading = false,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createResourceSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      type: initialData.type || 'WEBPAGE',
      url: initialData.url || '',
    },
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      {/* Resource Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Resource Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          autoComplete="off"
          placeholder="Enter resource title..."
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
          Description (Optional)
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          autoComplete="off"
          placeholder="Describe this resource..."
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

      {/* Resource Type */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Resource Type
        </label>
        <select
          {...register('type')}
          id="type"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white',
            errors.type &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        >
          <option value="WEBPAGE">Web Page</option>
          <option value="PDF">PDF</option>
          <option value="VIDEO">Video</option>
          <option value="DOCUMENT">Document</option>
          <option value="PRESENTATION">Presentation</option>
          <option value="CODE_REPOSITORY">Code Repository</option>
          <option value="BOOK">Book</option>
          <option value="ARTICLE">Article</option>
          <option value="WEBINAR">Webinar</option>
          <option value="TOOL">Tool</option>
          <option value="COURSE_NOTES">Course Notes</option>
        </select>
        {errors.type && (
          <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* URL */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          URL
        </label>
        <input
          {...register('url')}
          type="url"
          id="url"
          autoComplete="off"
          placeholder="https://..."
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            errors.url &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.url && (
          <p className="text-red-600 text-sm mt-1">{errors.url.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 justify-end">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
}
