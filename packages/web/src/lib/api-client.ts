import { client } from '#/api/.kubb/client';

client.setConfig({
    baseURL: import.meta.env.VITE_URL ?? 'http://localhost:8080',
    options: {
        withCredentials: true,
    },
});

export { client };

export default client;
