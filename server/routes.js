import _ from 'lodash';
import createError from 'http-errors';

const { Unauthorized, Conflict } = createError;
const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
    const generalChannelId = getNextId();

    const state = {
        channels: [
            { id: generalChannelId, name: 'general', removable: false },
            { id: getNextId(), name: 'random', removable: false },
        ],
        messages: [],
        currentChannelId: generalChannelId,
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

    app.io.on('connection', (socket) => {
        socket.on('newMessage', (message) => {
            const messageWithId = {
                ...message,
                id: getNextId(),
                createdAt: new Date(),
            };
            state.messages.push(messageWithId);
            app.io.emit('newMessage', messageWithId);
        });

        socket.on('newChannel', (channel) => {
            const channelWithId = {
                ...channel,
                id: getNextId(),
                removable: true,
            };
            state.channels.push(channelWithId);
            app.io.emit('newChannel', channelWithId);
        });

        socket.on('removeChannel', ({ id }) => {
            const channelId = Number(id);

            const channel = state.channels.find((c) => c.id === channelId);
            if (channel.removable) {
                state.channels = state.channels.filter(
                    (c) => c.id !== channelId
                );
                state.messages = state.messages.filter(
                    (m) => m.channel !== channelId
                );
                app.io.emit('removeChannel', { id: channelId });
            }
        });

        socket.on('renameChannel', ({ id, name }) => {
            const channelId = Number(id);

            const channel = state.channels.find((c) => c.id === channelId);

            if (channel) {
                channel.name = name;
                app.io.emit('renameChannel', channel);
            }
        });
    });

    app.post('/api/login', async (req, reply) => {
        const userName = _.get(req, 'body.userName');
        const password = _.get(req, 'body.password');

        const user = state.users.find((u) => u.userName === userName);

        if (!user || user.password !== password) {
            reply.send(new Unauthorized());
        }

        const userId = user.id;

        const token = app.jwt.sign({ userId });

        reply.send({ token, userName, userId });
    });

    app.post('/api/signup', async (req, reply) => {
        const userName = _.get(req, 'body.userName');
        const password = _.get(req, 'body.password');

        const user = state.users.find((u) => u.userName === userName);

        if (user) {
            reply.send(new Conflict());
        }

        const userId = getNextId();

        const newUser = { id: userId, userName, password };

        state.users.push(newUser);

        const token = app.jwt.sign({ userId });

        reply
            .code(201)
            .headers({ 'Content-Type': 'application/json; charset=utf-8' })
            .send({ token, userName, userId });
    });

    app.get(
        '/api/data',
        { onRequest: [app.authenticate] },
        (request, reply) => {
            const user = state.users.find((u) => u.id === request.user.userId);

            if (!user) {
                reply.send(new Unauthorized());
            }

            reply
                .headers({ 'Content-Type': 'application/json; charset=utf-8' })
                .send(_.omit(state, 'users'));
        }
    );

    app.get('*', (_req, reply) => {
        reply.view('index');
    });
};
