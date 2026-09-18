import { type PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';
import { Toaster } from '../components/ui/toaster';

export const Integrations = ({ children }: PropsWithChildren) => {
    return (
        <QueryProvider>
            {children}
            <Toaster />
        </QueryProvider>
    );
};
