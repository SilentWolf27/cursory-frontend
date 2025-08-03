import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { AILoadingState } from '../../shared/components/ai-loading-state';
import type { GenerateCourseData } from '../services/course-service';

interface Props {
  onSubmit: (data: GenerateCourseData) => Promise<void>;
  loading?: boolean;
  initialData?: GenerateCourseData | undefined;
}

export function GenerateCourseForm({ 
  onSubmit, 
  loading = false,
  initialData
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GenerateCourseData>({
    mode: 'onChange',
    defaultValues: initialData || {
      description: '',
      objective: '',
      difficulty: 'beginner',
    },
  });

  if (loading) {
    return (
      <AILoadingState
        title="Generando tu curso con IA"
        description="Nuestra IA está analizando tu información y creando un curso personalizado. Esto puede tomar unos segundos..."
        size="md"
      />
    );
  }

  const handleFormSubmit = async (data: GenerateCourseData) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6"
    >
      {/* Topic Question */}
      <div>
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿De qué trata tu curso? 🤔
        </label>
        <textarea
          {...register('description', {
            required: 'Cuéntanos sobre qué quieres enseñar',
          })}
          id="description"
          rows={4}
          placeholder="Por ejemplo: Quiero enseñar programación en Python para principiantes, o crear un curso sobre marketing digital..."
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.description &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Expected Outcome Question */}
      <div>
        <label
          htmlFor="objective"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué podrán hacer tus estudiantes al finalizar? 🎯
        </label>
        <textarea
          {...register('objective', {
            required: 'Describe los resultados esperados',
          })}
          id="objective"
          rows={4}
          placeholder="Por ejemplo: Serán capaces de crear aplicaciones web completas, o podrán diseñar estrategias de marketing efectivas..."
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.objective &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.objective && (
          <p className="text-red-600 text-sm mt-1">
            {errors.objective.message}
          </p>
        )}
      </div>

      {/* Difficulty Level Question */}
      <div>
        <label
          htmlFor="difficulty"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué nivel de dificultad tienes en mente? 📊
        </label>
        <select
          {...register('difficulty', {
            required: 'Selecciona el nivel de dificultad',
          })}
          id="difficulty"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white',
            errors.difficulty &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        >
          <option value="beginner">
            Principiante - Para personas que están empezando desde cero
          </option>
          <option value="intermediate">
            Intermedio - Para personas con algo de experiencia
          </option>
          <option value="advanced">
            Avanzado - Para personas con experiencia sólida
          </option>
        </select>
        {errors.difficulty && (
          <p className="text-red-600 text-sm mt-1">
            {errors.difficulty.message}
          </p>
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
              Generando con IA...
            </div>
          ) : (
            'Generar con IA ✨'
          )}
        </button>
      </div>
    </form>
  );
}
