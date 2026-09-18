import { client } from '#/api/.kubb/client';

client.setConfig({
    baseURL: 'http://localhost:8080',
    options: {
        withCredentials: true,
    },
});

export { client };

export default client;
