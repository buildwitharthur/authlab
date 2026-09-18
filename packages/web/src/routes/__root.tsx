import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';

import '../styles.css';

export const Route = createRootRoute({
    head: () => ({
        meta: [{ title: 'AuthLab — ArthurLabs' }],
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
