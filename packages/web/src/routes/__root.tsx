import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { createRouteMetadata } from '../lib/route-metadata';

import '../styles.css';

export const Route = createRootRoute({
    head: () => ({
        ...createRouteMetadata({
            title: 'AuthLab — ArthurLabs',
            description:
                'Um experimento de autenticação web construído em público. Crie sua conta e faça parte do mural AuthLab.',
        }),
        links: [{ rel: 'icon', href: '/favicon.ico' }],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <Outlet />
        </>
    );
}
