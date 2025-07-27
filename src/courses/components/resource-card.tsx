import type { Resource } from '../types/resource';

interface Props {
  resource: Resource;
  onDelete?: (resourceId: string) => void;
  onEdit?: (resource: Resource) => void;
}

export function ResourceCard({ resource, onDelete, onEdit }: Props) {
  const handleDelete = () => {
    if (onDelete) onDelete(resource.id);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(resource);
  };

  const handleOpenLink = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      {/* Left side - Type badge and title */}
      <div className="flex items-center gap-3 flex-1">
        {/* Resource type badge */}
        <div className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
          {resource.type}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {resource.title}
          </h3>
          {resource.description && (
            <p className="text-sm text-gray-600 truncate mt-1">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-2">
        {/* Link button */}
        <button
          onClick={handleOpenLink}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Open resource link"
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>

        {/* Edit button */}
        {onEdit && (
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Edit resource"
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

        {/* Delete button */}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
            aria-label="Delete resource"
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
  );
}
