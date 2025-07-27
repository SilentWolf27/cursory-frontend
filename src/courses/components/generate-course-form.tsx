import { useForm } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';

interface GenerateCourseData {
  topic: string;
  expectedOutcome: string;
  difficultyLevel: string;
}

interface Props {
  onSubmit: (data: GenerateCourseData) => Promise<void>;
  loading?: boolean;
}

export function GenerateCourseForm({ onSubmit, loading = false }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GenerateCourseData>({
    mode: 'onChange',
    defaultValues: {
      topic: '',
      expectedOutcome: '',
      difficultyLevel: 'BEGINNER',
    },
  });

  const handleFormSubmit = async (data: GenerateCourseData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      {/* Topic Question */}
      <div>
        <label
          htmlFor="topic"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿De qué trata tu curso? 🤔
        </label>
        <textarea
          {...register('topic', { required: 'Cuéntanos sobre qué quieres enseñar' })}
          id="topic"
          rows={4}
          placeholder="Por ejemplo: Quiero enseñar programación en Python para principiantes, o crear un curso sobre marketing digital..."
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.topic &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.topic && (
          <p className="text-red-600 text-sm mt-1">{errors.topic.message}</p>
        )}
      </div>

      {/* Expected Outcome Question */}
      <div>
        <label
          htmlFor="expectedOutcome"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué podrán hacer tus estudiantes al finalizar? 🎯
        </label>
        <textarea
          {...register('expectedOutcome', { required: 'Describe los resultados esperados' })}
          id="expectedOutcome"
          rows={4}
          placeholder="Por ejemplo: Serán capaces de crear aplicaciones web completas, o podrán diseñar estrategias de marketing efectivas..."
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.expectedOutcome &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.expectedOutcome && (
          <p className="text-red-600 text-sm mt-1">{errors.expectedOutcome.message}</p>
        )}
      </div>

      {/* Difficulty Level Question */}
      <div>
        <label
          htmlFor="difficultyLevel"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué nivel de dificultad tienes en mente? 📊
        </label>
        <select
          {...register('difficultyLevel', { required: 'Selecciona el nivel de dificultad' })}
          id="difficultyLevel"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white',
            errors.difficultyLevel &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        >
          <option value="BEGINNER">Principiante - Para personas que están empezando desde cero</option>
          <option value="INTERMEDIATE">Intermedio - Para personas con algo de experiencia</option>
          <option value="ADVANCED">Avanzado - Para personas con experiencia sólida</option>
        </select>
        {errors.difficultyLevel && (
          <p className="text-red-600 text-sm mt-1">{errors.difficultyLevel.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 justify-end">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generando...
            </div>
          ) : (
            'Generar con IA ✨'
          )}
        </button>
      </div>
    </form>
  );
} 