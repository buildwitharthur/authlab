import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

const STALE_TIME = 5 * 60 * 1000; // 5 minutos

export const QueryProvider = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: STALE_TIME,
                        retry: false,
                    },
                    mutations: {
                        onError: (error: any) =>
                            toast.error(error.data.message),
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
