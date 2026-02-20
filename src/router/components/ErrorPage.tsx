import ErrorBoundary from '@/components/fallback-render';
import { useRoute, useRouter } from '@/router';

const ErrorPage = () => {
  const { reload } = useRouter();

  const { error } = useRoute();

  return <ErrorBoundary error={error} resetErrorBoundary={reload} />;
};

export default ErrorPage;
