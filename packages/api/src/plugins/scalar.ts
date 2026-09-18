import scalar from '@scalar/fastify-api-reference';
import type { FastifyInstance } from 'fastify';

export const scalarPlugin = (app: FastifyInstance) => {
    app.register(scalar, {
        routePrefix: '/docs',
        configuration: {
            url: '/openapi.json',
            pageTitle: 'Auth Lab API Reference',
            theme: 'moon',
            showSidebar: false,
        },
    });
};
