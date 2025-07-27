import apiClient from '../../shared/utils/api-client';
import type { Module } from '../types/module';
import type {
  CreateModuleData,
  UpdateModuleData,
} from '../schemas/module-schemas';

export interface ModuleResponse extends Module {}

export const moduleService = {
  /**
   * Creates a new module within a specific course
   * @param courseId - Unique course ID
   * @param data - Module data to create (title, description, order, objectives)
   * @returns Promise that resolves with the created module
   * @throws Error if course doesn't exist, user lacks access, or data is invalid
   */
  async createModule(
    courseId: string,
    data: CreateModuleData
  ): Promise<ModuleResponse> {
    const response = await apiClient.post<ModuleResponse>(
      `/courses/${courseId}/modules`,
      data
    );
    return response.data;
  },

  /**
   * Retrieves a specific module within a course
   * @param courseId - Unique course ID
   * @param moduleId - Unique module ID
   * @returns Promise that resolves with the module
   * @throws Error if course or module doesn't exist
   */
  async getModuleById(
    courseId: string,
    moduleId: string
  ): Promise<ModuleResponse> {
    const response = await apiClient.get<ModuleResponse>(
      `/courses/${courseId}/modules/${moduleId}`
    );
    return response.data;
  },

  /**
   * Updates an existing module within a course
   * @param courseId - Unique course ID
   * @param moduleId - Unique module ID
   * @param data - Partial data to update
   * @returns Promise that resolves with the updated module
   * @throws Error if user is not the course owner or module doesn't exist
   */
  async updateModule(
    courseId: string,
    moduleId: string,
    data: UpdateModuleData
  ): Promise<ModuleResponse> {
    const response = await apiClient.put<ModuleResponse>(
      `/courses/${courseId}/modules/${moduleId}`,
      data
    );
    return response.data;
  },

  /**
   * Permanently deletes a module from a course
   * @param courseId - Unique course ID
   * @param moduleId - Unique module ID
   * @throws Error if user is not the course owner or module doesn't exist
   */
  async deleteModule(courseId: string, moduleId: string): Promise<void> {
    await apiClient.delete(`/courses/${courseId}/modules/${moduleId}`);
  },
};
