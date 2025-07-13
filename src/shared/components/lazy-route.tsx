import { Suspense } from 'react';
import type { ComponentType } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface LazyRouteProps {
  component: ComponentType<any>;
}

export function LazyRoute({ component: Component }: LazyRouteProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
}
