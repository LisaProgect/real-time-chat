import fastify from 'fastify';
import { test, expect } from '@jest/globals';
import pino from 'pino';
import pretty from 'pino-pretty';

import init from '../server/plugin.js';

test('get method home page', async () => {
    const logger = pino(pretty({ sync: true, colorize: true }));
    const app = fastify({ logger });
    await init(app, { state: {} });

    const response = await app.inject({
        url: '/',
    });

    expect(response.statusCode).toEqual(200);
});
