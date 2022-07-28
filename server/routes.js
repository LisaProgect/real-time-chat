import _ from 'lodash';
import createError from 'http-errors';

const { Unauthorized, Conflict } = createError;
const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
    const state = {
        channels: [
            { id: getNextId(), name: 'general', removable: false },
            { id: getNextId(), name: 'random', removable: false },
        ],
        messages: [],
        currentChannelId: 103,
        users: [
            { id: 1, userName: 'admin', password: 'admin' },
            { id: 2, userName: 'admin1', password: 'admin1' },
        ],
    };
    _.keys(state).forEach((key) => {
        if (defaultState[key] && _.isObject(state[key])) {
            state[key].push(...defaultState[key]);
        } else if (defaultState[key]) {
            state[key] = defaultState[key];
        }
    });

    return state;
};

export default (app, defaultState = {}) => {
    const state = buildState(defaultState);
    // app.io.on('connection', (socket) => {
    //     console.log({ 'socket.id': socket.id });
    // });
    app.post('/api/login', async (req, reply) => {
        const userName = _.get(req, 'body.userName');
        const password = _.get(req, 'body.password');

        const user = state.users.find((u) => u.userName === userName);

        if (!user || user.password !== password) {
            reply.send(new Unauthorized());
        }

        const token = app.jwt.sign({ userId: user.id });

        reply.send({ token, userName });
    });

    app.post('/api/signup', async (req, reply) => {
        const userName = _.get(req, 'body.userName');
        const password = _.get(req, 'body.password');

        const user = state.users.find((u) => u.userName === userName);

        if (user) {
            reply.send(new Conflict());
        }

        const newUser = { id: getNextId, userName, password };

        state.users.push(newUser);

        const token = app.jwt.sign({ userId: newUser.id });

        reply
            .code(201)
            .headers({ 'Content-Type': 'application/json; charset=utf-8' })
            .send({ token, userName });
    });

    app.get('*', (_req, reply) => {
        reply.view('index');
    });
};
