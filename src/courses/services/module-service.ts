import apiClient from '../../shared/utils/api-client';
import type { Module } from '../types/module';
import type {
  CreateModuleData,
  UpdateModuleData,
} from '../schemas/module-schemas';

export interface ModuleResponse extends Module {}

export const moduleService = {
  /**
   * Retrieves a specific module within a course
   * @param courseId - ID of the course containing the module
   * @param moduleId - Unique module ID
   * @returns Promise that resolves with the module data
   * @throws Error if course or module doesn't exist, or user lacks access
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
   * Creates a new module within a course, validating ownership permissions
   * @param courseId - ID of the course where to create the module
   * @param data - Module data (title, description, order, objectives)
   * @returns Promise that resolves with the created module
   * @throws Error if user is not the course owner or there's an order conflict
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
   * Updates an existing module, reordering if necessary
   * @param courseId - ID of the course containing the module
   * @param moduleId - ID of the module to update
   * @param data - Partial data to update
   * @returns Promise that resolves with the updated module
   * @throws Error if user is not the owner or there's an order conflict
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
   * Permanently deletes a module from the course
   * @param courseId - ID of the course containing the module
   * @param moduleId - ID of the module to delete
   * @throws Error if user is not the course owner
   */
  async deleteModule(courseId: string, moduleId: string): Promise<void> {
    await apiClient.delete(`/courses/${courseId}/modules/${moduleId}`);
  },
};
