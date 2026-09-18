import { defineConfig } from 'kubb/config';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginAxios } from '@kubb/plugin-axios';
import { pluginReactQuery } from '@kubb/plugin-react-query';
import { pluginZod } from '@kubb/plugin-zod';

const apiUrl = process.env.VITE_URL ?? 'http://localhost:8080';

export default defineConfig({
    input: `${apiUrl}/openapi.json`,
    output: {
        path: './src/api',
        clean: true,
    },
    plugins: [
        pluginTs({
            output: {
                path: 'types',
                mode: 'directory',
            },
        }),

        pluginAxios({
            output: {
                path: 'clients',
                mode: 'directory',
            },
        }),

        pluginReactQuery({
            output: {
                path: 'hooks',
                mode: 'directory',
            },
            suspense: false,
            hooks: true,
        }),

        pluginZod({
            output: {
                path: 'zod',
                mode: 'directory',
            },
        }),
    ],
});
