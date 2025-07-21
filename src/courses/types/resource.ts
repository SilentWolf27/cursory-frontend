export const ResourceType = {
  PDF: 'PDF',
  VIDEO: 'VIDEO',
  WEBPAGE: 'WEBPAGE',
  DOCUMENT: 'DOCUMENT',
  PRESENTATION: 'PRESENTATION',
  CODE_REPOSITORY: 'CODE_REPOSITORY',
  BOOK: 'BOOK',
  ARTICLE: 'ARTICLE',
  WEBINAR: 'WEBINAR',
  TOOL: 'TOOL',
  COURSE_NOTES: 'COURSE_NOTES',
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
  courseId: string;
}
