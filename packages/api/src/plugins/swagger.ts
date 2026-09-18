import swagger from '@fastify/swagger';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { SESSION_COOKIE_NAME } from './jwt.js';

export const swaggerPlugin = (app: FastifyInstance) => {
    app.register(swagger, {
        openapi: {
            info: {
                title: 'Auth Lab API',
                description: 'API documentation for Auth Lab',
                version: '1.0.0',
            },
            components: {
                securitySchemes: {
                    cookieAuth: {
                        type: 'apiKey',
                        in: 'cookie',
                        name: SESSION_COOKIE_NAME,
                    },
                },
            },
            tags: [
                { name: 'Authentication', description: 'Sign up, sign in, and sign out.' },
                { name: 'Members', description: 'Member profile and directory data.' },
            ],
        },

        transform: jsonSchemaTransform,
    });

    app.get('/openapi.json', () => app.swagger());
};
