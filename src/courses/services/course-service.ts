import apiClient from '../../shared/utils/api-client';
import type { Course } from '../types/course';
import type {
  CreateCourseData,
  UpdateCourseData,
} from '../schemas/course-schemas';

export interface CoursesResponse {
  courses: Omit<Course, 'modules' | 'resources'>[];
}

export interface CourseResponse extends Course {}

export const courseService = {
  /**
   * Retrieves all courses for the authenticated user
   * @returns Promise that resolves with the list of courses
   * @throws Error if user is not authenticated
   */
  async getAllCourses(): Promise<CoursesResponse> {
    const response = await apiClient.get<CoursesResponse>('/courses');
    return response.data;
  },

  /**
   * Retrieves a specific course with all its modules and resources
   * @param id - Unique course ID
   * @returns Promise that resolves with the complete course
   * @throws Error if course doesn't exist or user lacks access
   */
  async getCourseById(id: string): Promise<CourseResponse> {
    const response = await apiClient.get<CourseResponse>(`/courses/${id}`);
    return response.data;
  },

  /**
   * Creates a new course with unique slug and associates it to the authenticated user
   * @param data - Course data to create (title, description, slug, visibility, tags)
   * @returns Promise that resolves with the created course
   * @throws Error if slug already exists or data is invalid
   */
  async createCourse(data: CreateCourseData): Promise<CourseResponse> {
    const response = await apiClient.post<CourseResponse>('/courses', data);
    return response.data;
  },

  /**
   * Updates an existing course, validating ownership permissions
   * @param id - Unique ID of the course to update
   * @param data - Partial data to update
   * @returns Promise that resolves with the updated course
   * @throws Error if user is not the owner or slug already exists
   */
  async updateCourse(
    id: string,
    data: UpdateCourseData
  ): Promise<CourseResponse> {
    const response = await apiClient.put<CourseResponse>(
      `/courses/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Permanently deletes a course and all its modules and resources
   * @param id - Unique ID of the course to delete
   * @throws Error if user is not the course owner
   */
  async deleteCourse(id: string): Promise<void> {
    await apiClient.delete(`/courses/${id}`);
  },
};
