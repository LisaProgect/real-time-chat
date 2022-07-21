import React from 'react';
import Message from '../message';
import { Form, SubmitButton, Input } from '../form';

const messageItems = [
    {
        own: true,
        message: {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            createAt: '2020-11-02',
            user: 'Lisa',
        },
    },
    {
        own: true,
        message: {
            text: 'Asperiores odit reprehenderit nisi culpa hic esse quo nostrum dolorum sapiente vel.',
            createAt: '2021-11-02',
            user: 'Lisa',
        },
    },
    {
        own: false,
        message: {
            text: 'Doloribus blanditiis amet ducimus odit nulla vel voluptates, velit eos?',
            createAt: '2022-07-21',
            user: 'New user',
        },
    },
    {
        own: false,
        message: {
            text: 'Doloribus blanditiis amet ducimus odit nulla vel voluptates, velit eos?',
            createAt: '2022-07-21 15:24:00',
            user: 'New user',
        },
    },
    {
        own: false,
        message: {
            text: 'Doloribus blanditiis amet ducimus odit nulla vel voluptates, velit eos?',
            createAt: '2022-07-21 15:24:00',
            user: 'New user',
        },
    },
];
const Chat = () => (
    <div className="max-w-3xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
        <div className="flex-auto bg-gray-100">
            {messageItems.map(({ own, message }, index) => (
                <Message key={index} own={own} message={message} />
            ))}
        </div>
        <Form
            image={false}
            className="sticky bottom-0 flex p-2 items-end bg-gray-200 z-40"
        >
            <Input type="text" />
            <SubmitButton className="my-3">Submit</SubmitButton>
        </Form>
    </div>
);

export default Chat;
