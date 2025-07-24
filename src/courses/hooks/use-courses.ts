import { useState, useEffect } from 'react';
import {
  courseService,
  type CoursesResponse,
} from '../services/course-service';
import type { Course } from '../types/course';

type CourseListItem = Omit<Course, 'modules' | 'resources'>;

interface UseCoursesState {
  courses: CourseListItem[];
  loading: boolean;
  error: string | null;
}

export function useCourses() {
  const [state, setState] = useState<UseCoursesState>({
    courses: [],
    loading: true,
    error: null,
  });

  const fetchCourses = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response: CoursesResponse = await courseService.getAllCourses();
      setState(prev => ({
        ...prev,
        courses: response.courses,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch courses',
      }));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses: state.courses,
    loading: state.loading,
    error: state.error,
    refetch: fetchCourses,
  };
}
