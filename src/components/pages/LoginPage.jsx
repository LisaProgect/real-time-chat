import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input, Form, SubmitButton } from '../form/index.js';
import ChatService from '../../services/chat-service.js';

const LoginPage = () => {
    const chatService = new ChatService();
    const [authFailed, setAuthFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        onSubmit: (values) => {
            setAuthFailed(false);
            setIsLoading(true);
            try {
                const res = chatService.login(values);
                setIsLoading(false);
            } catch (error) {
                setAuthFailed(true);
                setIsLoading(false);
            }
        },
    });
    return (
        <div className="bg-gray-100 h-screen">
            <div className="container mx-auto max-w-md">
                <div className="card">
                    <Form
                        className="flex flex-col"
                        title="Sign in to your account"
                        onSubmit={formik.handleSubmit}
                    >
                        <Input
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                            isInvalid={authFailed}
                        >
                            User Name
                        </Input>
                        <Input
                            id="password"
                            name="password"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={authFailed}
                        >
                            Password
                        </Input>
                        <SubmitButton className="mt-8">Sign in</SubmitButton>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
