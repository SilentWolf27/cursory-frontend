// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
}

// Paginated response for lists
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  code?: string;
  statusCode?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

// Sort options for lists
export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: SortOptions;
  filters?: FilterOptions;
}

export interface ApiEndpoint {
  url: string;
  method: HttpMethod;
}
