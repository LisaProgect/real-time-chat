export default (app, defaultState = {}) => {
    app.get('/api/login', (_req, reply) => {});

    app.get('*', (_req, reply) => {
        reply.view('index');
    });
};
