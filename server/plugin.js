import fastifyStatic from '@fastify/static';
import path from 'path';
import Pug from 'pug';
import pointOfView from '@fastify/view';
import websocketPlugin from '@fastify/websocket';
import fastifyJwt from '@fastify/jwt';
import { fileURLToPath } from 'url';
import routes from './routes.js';
import webpackConfig from '../webpack.config.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.join(__dirname, '..');

const isProduction = process.env.NODE_ENV === 'production';

const setupStatic = (app) =>
    app.register(fastifyStatic, { root: rootPath, prefix: '/assets/' });

const setupJwt = (app) =>
    app
        .register(fastifyJwt, { secret: 'supersecret' })
        .decorate('authenticate', async function (request, reply) {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
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
    fastify.register(websocketPlugin);
    setupPointOfView(fastify);
    routes(fastify, options.state || {});
    return fastify;
};
