import { useState } from 'react';
import { clsx } from 'clsx';
import type { GeneratedModule } from '../services/module-service';

interface Props {
  modules: GeneratedModule[];
  onConfirm: (modules: GeneratedModule[]) => void;
  onCancel: () => void;
  isCreating: boolean;
}

export function GeneratedModulesList({
  modules,
  onConfirm,
  onCancel,
  isCreating,
}: Props) {
  const [selectedModules, setSelectedModules] =
    useState<GeneratedModule[]>(modules);

  const handleRemoveModule = (index: number) => {
    setSelectedModules(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onConfirm(selectedModules);
  };

  const handleCancel = () => {
    onCancel();
  };

  if (selectedModules.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No hay módulos seleccionados</p>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Módulos Generados ({selectedModules.length})
        </h3>
        <p className="text-sm text-gray-600">
          Revisa y elimina los módulos que no te gusten
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {selectedModules.map((module, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">
                  {module.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {module.description}
                </p>
                {module.objectives && module.objectives.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Objetivos:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {module.objectives.map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRemoveModule(index)}
                className="ml-3 px-2 py-1 text-gray-400 hover:text-red-500 transition-colors text-sm"
                title="Eliminar módulo"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleCancel}
          disabled={isCreating}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          onClick={handleConfirm}
          disabled={isCreating || selectedModules.length === 0}
          className={clsx(
            'px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2',
            'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isCreating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creando módulos...</span>
            </>
          ) : (
            <>
              <span>✓</span>
              <span>Crear {selectedModules.length} módulos</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
