import apiClient from '../../shared/utils/api-client';
import type { Resource } from '../types/resource';
import type {
  CreateResourceData,
  UpdateResourceData,
} from '../schemas/resource-schemas';

export interface ResourceResponse extends Resource {}

export const resourceService = {
  /**
   * Creates a new resource within a course, validating URL and permissions
   * @param courseId - ID of the course where to create the resource
   * @param data - Resource data (title, description, type, URL)
   * @returns Promise that resolves with the created resource
   * @throws Error if user is not the course owner or URL is invalid
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
   * Updates an existing resource, validating URL if modified
   * @param courseId - ID of the course containing the resource
   * @param resourceId - ID of the resource to update
   * @param data - Partial data to update
   * @returns Promise that resolves with the updated resource
   * @throws Error if user is not the owner or URL is invalid
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
   * Permanently deletes a resource from the course
   * @param courseId - ID of the course containing the resource
   * @param resourceId - ID of the resource to delete
   * @throws Error if user is not the course owner
   */
  async deleteResource(courseId: string, resourceId: string): Promise<void> {
    await apiClient.delete(`/courses/${courseId}/resources/${resourceId}`);
  },
};
