import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { courseService } from '../services/course-service';
import { moduleService } from '../services/module-service';
import { resourceService } from '../services/resource-service';
import { CourseForm } from '../components/course-form';
import { ModuleCard } from '../components/module-card';
import { ResourceCard } from '../components/resource-card';
import { ResourceForm } from '../components/resource-form';
import { type CreateCourseData } from '../schemas/course-schemas';
import { type Course } from '../types/course';
import { LoadingSpinner } from '../../shared/components/loading-spinner';
import { ErrorState } from '../../shared/components/error-state';
import { Tab } from '../../shared/components/layout/tab/tab';
import { useTab } from '../../shared/components/layout/tab/use-tab';
import { type Tab as TabType } from '../../shared/components/layout/tab/types';
import { CourseContent } from '../components/course-content';
import { Modal } from '../../shared/components/modal/modal';
import { ModuleForm } from '../components/module-form';
import { useAIModuleGeneration } from '../hooks/use-ai-module-generation';
import { GenerateModulesForm } from '../components/generate-modules-form';
import { GeneratedModulesList } from '../components/generated-modules-list';
import { AILoadingState } from '../../shared/components/ai-loading-state';
import type { Module } from '../types/module';

const tabs: TabType[] = [
  { id: 'modules', label: 'Modules' },
  { id: 'resources', label: 'Resources' },
];

function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { activeTab, setActiveTab } = useTab({ tabs, initialTab: 'modules' });
  const {
    isModalOpen: isAIModalOpen,
    isGenerating,
    isCreating,
    showReviewList,
    generatedModules,
    openModal: openAIModal,
    closeModal: closeAIModal,
    generateModules,
    createModules,
  } = useAIModuleGeneration();

  const handleAddContent = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleGenerateModules = async (data: any) => {
    try {
      await generateModules(id!, data);
    } catch (error) {}
  };

  const handleCreateModules = async (modules: any[]) => {
    try {
      const response = await createModules(id!, modules);

      // Update course state with new modules
      setCourse(prevCourse => ({
        ...prevCourse!,
        modules: [...(prevCourse!.modules || []), ...response.modules],
      }));
    } catch (error) {}
  };

  const handleCreateModule = async (data: any) => {
    try {
      const newModule = await moduleService.createModule(id!, data);
      setCourse(prevCourse => ({
        ...prevCourse!,
        modules: [...(prevCourse!.modules || []), newModule],
      }));
      handleCloseModal();
    } catch (error) {}
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await moduleService.deleteModule(id!, moduleId);
      setCourse(prevCourse => ({
        ...prevCourse!,
        modules: prevCourse!.modules?.filter(m => m.id !== moduleId) || [],
      }));
    } catch (error) {}
  };

  const handleEditModule = (module: Module) => {
    console.log(module);
  };

  const handleCreateResource = async (data: any) => {
    try {
      const newResource = await resourceService.createResource(id!, data);
      setCourse(prevCourse => ({
        ...prevCourse!,
        resources: [...(prevCourse!.resources || []), newResource],
      }));
      handleCloseModal();
    } catch (error) {}
  };

  const handleDeleteResource = async (resourceId: string) => {
    try {
      await resourceService.deleteResource(id!, resourceId);
      setCourse(prevCourse => ({
        ...prevCourse!,
        resources:
          prevCourse!.resources?.filter(r => r.id !== resourceId) || [],
      }));
    } catch (error) {}
  };

  const handleEditResource = (resource: any) => {
    console.log(resource);
  };

  const fetchCourse = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const courseData = await courseService.getCourseById(id);
      setCourse(courseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleSubmit = async (data: CreateCourseData) => {
    if (!id) return;

    try {
      setIsSaving(true);
      setError(null);

      const updatedCourse = await courseService.updateCourse(id, data);
      setCourse(updatedCourse);

      navigate('/cursos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate('/cursos');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !course)
    return <ErrorState title="Error loading course" message={error} />;

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleCancel}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
            <p className="text-gray-600 mt-2">
              Modify the details of your course "{course.title}"
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400 mr-3 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-red-800 font-medium">
                  Something went wrong
                </p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Course Information
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Provide the essential information about your course
              </p>
            </div>

            <CourseForm
              initialData={{
                title: course.title,
                description: course.description,
                slug: course.slug,
                visibility: course.visibility,
                tags: course.tags || [],
              }}
              onSubmit={handleSubmit}
              loading={isSaving}
              submitText="Save Changes"
            />
          </div>

          {/* Course Content Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
              {activeTab === 'modules' && (
                <CourseContent
                  type="modules"
                  onAdd={handleAddContent}
                  onGenerateWithAI={() => openAIModal()}
                >
                  {course.modules && course.modules.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {course.modules.map(module => (
                        <ModuleCard
                          key={module.id}
                          module={module}
                          onDelete={handleDeleteModule}
                          onEdit={handleEditModule}
                        />
                      ))}
                    </div>
                  )}
                </CourseContent>
              )}
              {activeTab === 'resources' && (
                <CourseContent type="resources" onAdd={handleAddContent}>
                  {course.resources && course.resources.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {course.resources.map(resource => (
                        <ResourceCard
                          key={resource.id}
                          resource={resource}
                          onDelete={handleDeleteResource}
                          onEdit={handleEditResource}
                        />
                      ))}
                    </div>
                  )}
                </CourseContent>
              )}
            </Tab>
          </div>
        </div>
      </div>

      {/* Add Module/Resource Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add ${activeTab === 'modules' ? 'Module' : 'Resource'}`}
        size="lg"
      >
        {activeTab === 'modules' ? (
          <ModuleForm
            onSubmit={handleCreateModule}
            moduleCount={course.modules?.length || 0}
          />
        ) : (
          <ResourceForm
            onSubmit={handleCreateResource}
            submitText="Add Resource"
          />
        )}
      </Modal>

      {/* AI Module Generation Modal */}
      <Modal
        isOpen={isAIModalOpen}
        onClose={closeAIModal}
        title={showReviewList ? "Revisar Módulos Generados" : "Generar Módulos con IA"}
        size="xl"
      >
        {isGenerating ? (
          <AILoadingState
            title="Generando módulos con IA"
            description="Estamos creando módulos personalizados basados en tus especificaciones. Esto puede tomar unos momentos."
            size="lg"
          />
        ) : showReviewList ? (
          <GeneratedModulesList
            modules={generatedModules}
            onConfirm={handleCreateModules}
            onCancel={closeAIModal}
            isCreating={isCreating}
          />
        ) : (
          <GenerateModulesForm
            onSubmit={handleGenerateModules}
            loading={isGenerating}
          />
        )}
      </Modal>
    </div>
  );
}

export default EditCoursePage;
