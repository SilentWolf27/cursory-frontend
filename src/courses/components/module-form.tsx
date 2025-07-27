import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  createModuleSchema,
  type CreateModuleData,
} from '../schemas/module-schemas';
import clsx from 'clsx';

interface Props {
  initialData?: Partial<CreateModuleData>;
  onSubmit: (data: CreateModuleData) => Promise<void>;
  loading?: boolean;
  moduleCount?: number;
}

export function ModuleForm({
  initialData = {},
  onSubmit,
  loading = false,
  moduleCount = 0,
}: Props) {
  const [objectives, setObjectives] = useState<string[]>(
    initialData.objectives || []
  );
  const [objectiveInput, setObjectiveInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createModuleSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      order: moduleCount + 1,
      objectives: initialData.objectives || [],
    },
  });

  const handleFormSubmit = async (data: any) => {
    const formData = {
      ...data,
      objectives,
    };
    await onSubmit(formData);
  };

  const addObjective = () => {
    const trimmedObjective = objectiveInput.trim();
    if (trimmedObjective && !objectives.includes(trimmedObjective)) {
      setObjectives([...objectives, trimmedObjective]);
      setObjectiveInput('');
    }
  };

  const removeObjective = (objectiveToRemove: string) => {
    setObjectives(objectives.filter(obj => obj !== objectiveToRemove));
  };

  const handleObjectiveKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addObjective();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Module Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Module Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          autoComplete="off"
          placeholder="Enter module title..."
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
          placeholder="Describe what students will learn in this module..."
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

      {/* Learning Objectives */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Learning Objectives
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Add specific learning objectives for this module
        </p>

        {/* Objective Input */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={objectiveInput}
            onChange={e => setObjectiveInput(e.target.value)}
            onKeyDown={handleObjectiveKeyPress}
            placeholder="Add a learning objective..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={addObjective}
            disabled={!objectiveInput.trim()}
            className="px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 cursor-pointer"
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

        {/* Objectives Display */}
        {objectives.length > 0 && (
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="flex-1 text-sm text-gray-800">
                  {objective}
                </span>
                <button
                  type="button"
                  onClick={() => removeObjective(objective)}
                  className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
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
              </div>
            ))}
          </div>
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
              Creating...
            </div>
          ) : (
            'Guardar'
          )}
        </button>
      </div>
    </form>
  );
}
