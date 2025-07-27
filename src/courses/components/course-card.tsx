import { Link } from 'react-router';
import { type Course } from '../types/course';
import clsx from 'clsx';
import { isCoursePublic } from '../utils/visibility';

type CourseListItem = Omit<Course, 'modules' | 'resources'>;

interface Props {
  course: CourseListItem;
}

export function CourseCard({ course }: Props) {
  const isPublic = isCoursePublic(course.visibility);

  return (
    <Link
      to={`/cursos/${course.id}/editar`}
      className="block cursor-pointer group relative py-3 px-5 border border-gray-200 rounded-lg min-w-xs min-h-5 bg-white hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 transition-[translate] duration-300 ease-out hover:-translate-y-1"
    >
      <span
        className={clsx(
          'absolute flex items-center gap-1 py-1 px-4 rounded-full text-xs font-semibold border top-3 right-5',
          {
            'bg-green-100 text-green-700 border-green-200': isPublic,
            'bg-amber-100 text-amber-700 border-amber-200': !isPublic,
          }
        )}
      >
        {isPublic ? (
          <>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Public
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Private
          </>
        )}
      </span>
      <h2 className="text-lg font-semibold transition-colors duration-100 group-hover:text-blue-600 max-w-[240px] text-balance">
        {course.title}
      </h2>

      <p className="text-md text-gray-500 mt-4 transition-colors duration-100 group-hover:text-gray-600 line-clamp-3">
        {course.description}
      </p>

      {course.tags && (
        <div className="flex items-center gap-2 mt-4">
          {course.tags.map((tag, index) => (
            <>
              {index < 3 && (
                <span
                  key={`${tag}-${index}`}
                  className="text-xs text-gray-800 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 ease-out"
                >
                  {tag}
                </span>
              )}
              {index === 3 && (
                <span className="text-xs text-gray-800 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 ease-out">
                  +{course.tags.length - 3}
                </span>
              )}
            </>
          ))}
        </div>
      )}
    </Link>
  );
}
