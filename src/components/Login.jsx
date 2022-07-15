import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Input from './Input.jsx';
import SubmitButton from './SubmitButton.jsx';
import Form from './Form.jsx';
import debug from 'debug';

const Login = () => {
    const [authFailed, setAuthFailed] = useState(false);
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        onSubmit: async (values) => {
            setAuthFailed(false);
            try {
                const res = await axios.post('api/login', values);
                console.log(res.data);
            } catch (error) {
                debug('debug:Error')(error);
                debug('debug:State')(authFailed);
                setAuthFailed(true);
                debug('debug:State')(authFailed);
            }
        },
    });
    return (
        <div className="container mx-auto max-w-md">
            <div className="card">
                <Form
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
                    <SubmitButton>Sign in</SubmitButton>
                </Form>
            </div>
        </div>
    );
};

export default Login;
