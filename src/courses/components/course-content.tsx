import type { ReactNode } from 'react';

interface Props {
  type: 'modules' | 'resources';
  onAdd: () => void;
  children?: ReactNode;
}

const contentConfig = {
  modules: {
    title: 'Course Modules',
    description: 'Structure your course content into organized modules',
    emptyTitle: 'No modules yet',
    emptyDescription:
      'Start building your course by adding the first module. Each module should focus on a specific topic or learning outcome.',
    addFirstButtonText: 'Add First Module',
    icon: (
      <svg
        className="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  resources: {
    title: 'Course Resources',
    description: 'Add helpful resources and materials for students',
    emptyTitle: 'No resources yet',
    emptyDescription:
      'Add helpful resources like PDFs, videos, articles, or tools that complement your course content.',
    addFirstButtonText: 'Add First Resource',
    icon: (
      <svg
        className="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
};

export function CourseContent({ type, onAdd, children }: Props) {
  const config = contentConfig[type];
  const hasContent = !!children;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {config.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{config.description}</p>
        </div>
        <button
          onClick={onAdd}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
          aria-label={`Add ${type.slice(0, -1)}`}
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

      {/* Content Area */}
      {hasContent ? (
        <div>{children}</div>
      ) : (
        <div className="text-center py-12">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            {config.icon}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {config.emptyTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {config.emptyDescription}
            </p>
            <button
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              {config.addFirstButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
