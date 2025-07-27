import apiClient from '../../shared/utils/api-client';
import type { Resource } from '../types/resource';
import type {
  CreateResourceData,
  UpdateResourceData,
} from '../schemas/resource-schemas';

export interface ResourceResponse extends Resource {}

export const resourceService = {
  /**
   * Creates a new resource within a specific course
   * @param courseId - Unique course ID
   * @param data - Resource data to create (title, description, type, url)
   * @returns Promise that resolves with the created resource
   * @throws Error if course doesn't exist, user lacks access, or data is invalid
   */
  async createResource(
    courseId: string,
    data: CreateResourceData
  ): Promise<ResourceResponse> {
    const response = await apiClient.post<ResourceResponse>(
      `/courses/${courseId}/resources`,
      data
    );
    return response.data;
  },

  /**
   * Updates an existing resource within a course
   * @param courseId - Unique course ID
   * @param resourceId - Unique resource ID
   * @param data - Partial data to update
   * @returns Promise that resolves with the updated resource
   * @throws Error if user is not the course owner or resource doesn't exist
   */
  async updateResource(
    courseId: string,
    resourceId: string,
    data: UpdateResourceData
  ): Promise<ResourceResponse> {
    const response = await apiClient.put<ResourceResponse>(
      `/courses/${courseId}/resources/${resourceId}`,
      data
    );
    return response.data;
  },

  /**
   * Permanently deletes a resource from a course
   * @param courseId - Unique course ID
   * @param resourceId - Unique resource ID
   * @throws Error if user is not the course owner or resource doesn't exist
   */
  async deleteResource(courseId: string, resourceId: string): Promise<void> {
    await apiClient.delete(`/courses/${courseId}/resources/${resourceId}`);
  },
};
