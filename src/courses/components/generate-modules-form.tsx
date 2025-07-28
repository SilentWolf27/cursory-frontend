import { useForm } from 'react-hook-form';
import clsx from 'clsx';

interface GenerateModulesData {
  suggestedTopics: string;
  numberOfModules: number;
  approach: string;
}

interface Props {
  onSubmit: (data: GenerateModulesData) => Promise<void>;
  loading?: boolean;
}

export function GenerateModulesForm({ onSubmit, loading = false }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GenerateModulesData>({
    mode: 'onChange',
    defaultValues: {
      suggestedTopics: '',
      numberOfModules: 5,
      approach: 'Práctico con proyectos reales',
    },
  });

  const handleFormSubmit = async (data: GenerateModulesData) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6"
    >
      {/* Suggested Topics Question */}
      <div>
        <label
          htmlFor="suggestedTopics"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué temas quieres cubrir en los módulos? 📚
        </label>
        <textarea
          {...register('suggestedTopics', {
            required: 'Los temas sugeridos son requeridos',
            maxLength: {
              value: 500,
              message: 'Los temas sugeridos no pueden exceder 500 caracteres',
            },
          })}
          id="suggestedTopics"
          rows={4}
          autoComplete="off"
          placeholder="Programación en Python, estructuras de datos, algoritmos básicos, manejo de archivos, APIs web"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.suggestedTopics &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.suggestedTopics && (
          <p className="text-red-600 text-sm mt-1">
            {errors.suggestedTopics.message}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-1">
          Describe los temas principales que quieres que se cubran en el curso
        </p>
      </div>

      {/* Number of Modules Question */}
      <div>
        <label
          htmlFor="numberOfModules"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Cuántos módulos quieres generar? 🔢
        </label>
        <input
          {...register('numberOfModules', {
            valueAsNumber: true,
            required: 'El número de módulos es requerido',
            min: {
              value: 1,
              message: 'Debe generar al menos 1 módulo',
            },
            max: {
              value: 20,
              message: 'No puede generar más de 20 módulos',
            },
          })}
          type="number"
          id="numberOfModules"
          min="1"
          max="20"
          autoComplete="off"
          placeholder="5"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            errors.numberOfModules &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.numberOfModules && (
          <p className="text-red-600 text-sm mt-1">
            {errors.numberOfModules.message}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-1">Entre 1 y 20 módulos</p>
      </div>

      {/* Approach Question */}
      <div>
        <label
          htmlFor="approach"
          className="block text-lg font-medium text-gray-900 mb-3"
        >
          ¿Qué enfoque de aprendizaje prefieres? 🎯
        </label>
        <textarea
          {...register('approach', {
            required: 'El enfoque de aprendizaje es requerido',
            maxLength: {
              value: 300,
              message: 'El enfoque no puede exceder 300 caracteres',
            },
          })}
          id="approach"
          rows={3}
          autoComplete="off"
          placeholder="Práctico con proyectos reales, ejercicios hands-on, casos de uso del mundo real"
          className={clsx(
            'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none',
            errors.approach &&
              'border-red-300 focus:ring-red-500 focus:border-red-500'
          )}
        />
        {errors.approach && (
          <p className="text-red-600 text-sm mt-1">{errors.approach.message}</p>
        )}
        <p className="text-sm text-gray-600 mt-1">
          Describe cómo quieres que se estructure el aprendizaje en los módulos
        </p>
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
              Generando...
            </div>
          ) : (
            'Generar Módulos'
          )}
        </button>
      </div>
    </form>
  );
}
