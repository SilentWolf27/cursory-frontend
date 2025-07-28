import { useState } from 'react';
import {
  moduleService,
  type GenerateModulesData,
  type GeneratedModule,
} from '../services/module-service';

export function useAIModuleGeneration() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [generatedModules, setGeneratedModules] = useState<GeneratedModule[]>(
    []
  );
  const [showReviewList, setShowReviewList] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setShowReviewList(false);
    setGeneratedModules([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsGenerating(false);
    setIsCreating(false);
    setShowReviewList(false);
    setGeneratedModules([]);
  };

  const generateModules = async (
    courseId: string,
    data: GenerateModulesData
  ) => {
    try {
      setIsGenerating(true);

      const response = await moduleService.generateModules(courseId, data);

      // Add temporary IDs to generated modules for UI management
      const modulesWithTempIds = response.modules.map((module, index) => ({
        ...module,
        id: `temp-${Date.now()}-${index}`,
      }));

      setGeneratedModules(modulesWithTempIds);
      setShowReviewList(true);
      return response;
    } finally {
      setIsGenerating(false);
    }
  };

  const createModules = async (
    courseId: string,
    modules: GeneratedModule[]
  ) => {
    try {
      setIsCreating(true);

      const response = await moduleService.createModulesBulk(courseId, {
        modules: modules.map(module => ({
          title: module.title,
          description: module.description,
          objectives: module.objectives || [],
          order: module.order,
        })),
      });

      closeModal();
      return response;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isModalOpen,
    isGenerating,
    isCreating,
    showReviewList,
    generatedModules,
    openModal,
    closeModal,
    generateModules,
    createModules,
  };
}
