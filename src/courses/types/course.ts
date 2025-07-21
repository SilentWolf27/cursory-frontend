import type { Module } from './module';
import type { Resource } from './resource';

export const CourseVisibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;

export type CourseVisibility =
  (typeof CourseVisibility)[keyof typeof CourseVisibility];

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  visibility: CourseVisibility;
  userId: string;
  modules: Module[];
  resources: Resource[];
}
