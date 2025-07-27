import type { Module } from '../types/module';

interface Props {
  module: Module;
  onDelete?: (moduleId: string) => void;
  onEdit?: (module: Module) => void;
}

export function ModuleCard({ module, onDelete, onEdit }: Props) {
  const handleDelete = () => {
    if (onDelete) onDelete(module.id);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(module);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      {/* Left side - Drag handle, order, title, description */}
      <div className="flex items-center gap-3 flex-1">
        {/* Drag handle */}
        <div className="cursor-grab active:cursor-grabbing">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </div>

        {/* Order badge */}
        <div className="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
          {module.order}
        </div>

        {/* Title and description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {module.title}
          </h3>
          <p className="text-sm text-gray-600 truncate">{module.description}</p>
        </div>
      </div>

      {/* Right side - Objectives count and actions */}
      <div className="flex items-center gap-3">
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Edit module"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
              aria-label="Delete module"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
