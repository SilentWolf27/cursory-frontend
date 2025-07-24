import { Link } from 'react-router';

interface Props {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionText,
  actionHref,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        {actionText && actionHref && (
          <Link
            to={actionHref}
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-base shadow-sm hover:shadow-md"
          >
            {actionText}
          </Link>
        )}
      </div>
    </div>
  );
}
