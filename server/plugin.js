// @ts-check

import fastifyStatic from '@fastify/static';
import path from 'path';
import Pug from 'pug';
import pointOfView from '@fastify/view';
import fastifySocketIo from 'fastify-socket.io';
import fastifyJwt from '@fastify/jwt';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import routes from './routes.js';
import webpackConfig from '../webpack.config.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.join(__dirname, '..');

const isProduction = process.env.NODE_ENV === 'production';

const setupStatic = (app) =>
    app.register(fastifyStatic, {
        root: path.join(rootPath, 'dist/public'),
        prefix: '/assets/',
    });

const setupJwt = (app) =>
    app
        .register(fastifyJwt, { secret: 'supersecret' })
        .decorate('authenticate', async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (_err) {
                reply.send(new createError.Unauthorized());
            }
        });

const setupPointOfView = (app) => {
    const { host, port } = webpackConfig.devServer;
    const domain = !isProduction ? `http://${host}:${port}` : '';
    app.register(pointOfView, {
        engine: {
            pug: Pug,
        },
        templates: path.join(__dirname, 'views'),
        viewExt: 'pug',
        defaultContext: {
            assetsPath: (file) => `${domain}/assets/${file}`,
        },
    });
};

export default async (fastify, options) => {
    setupStatic(fastify);
    setupJwt(fastify);
    setupPointOfView(fastify);
    await fastify.register(fastifySocketIo);
    routes(fastify, options.state || {});

    return fastify;
};
