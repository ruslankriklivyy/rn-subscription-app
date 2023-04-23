import {FC} from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import {ErrorComponent} from '../components/Error';

interface IMainLayoutProps {
  children: any;
}

export const MainLayout: FC<IMainLayoutProps> = ({children}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary>
  );
};
