import React, { useContext, useRef, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import Message from '../message';
import { Form, SubmitButton, Input } from '../form';
import { ConnectionContext } from '../../contexts/ConnectionContext.jsx';
import { selectCurrentChannel } from '../../slices/channels.js';
import { selectMessageByChannels } from '../../slices/messages.js';

const Chat = ({ currentUser }) => {
    const { addNewMessages } = useContext(ConnectionContext);
    const currentChannel = useSelector(selectCurrentChannel);
    const messageForChannel = useSelector((state) =>
        selectMessageByChannels(state, currentChannel)
    );

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageForChannel]);

    const formik = useFormik({
        initialValues: { message: '' },
        onSubmit: (values) => {
            const newMessage = {
                message: values.message,
                user: currentUser,
                channel: currentChannel,
            };
            addNewMessages(newMessage);
            // eslint-disable-next-line no-param-reassign
            values.message = '';
        },
    });

    return (
        <>
            <div className="h-full mt-16 min-h-screen p-2 bg-gray-100">
                {messageForChannel &&
                    messageForChannel.map(
                        ({ user, message, id, createdAt }) => (
                            <Message
                                key={id}
                                own={currentUser.userId === user.userId}
                                user={user.userName}
                                message={message}
                                createAt={createdAt}
                            />
                        )
                    )}
                <div ref={messagesEndRef} />
            </div>
            <Form
                image={false}
                className="sticky bottom-0 flex p-2 items-end bg-gray-200 z-19"
                onReset={formik.handleReset}
                onSubmit={formik.handleSubmit}
            >
                <Input
                    type="text"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                />
                <SubmitButton className="my-3">Submit</SubmitButton>
            </Form>
        </>
    );
};

export default memo(Chat);
