import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { AppSkeleton } from './app-skeleton';
import { useProfile } from '../api/hooks/useProfile';

export function AuthGuard({ children }: PropsWithChildren) {
    const { isLoading, data: user } = useProfile();

    if (isLoading) return <AppSkeleton />;

    if (!user) return <Navigate to="/" replace />;

    return children;
}
