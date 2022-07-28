import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { clearMessage } from '../../slices/message.js';
import { ErrorMessage } from '../message';
import { Form, SubmitButton, Input } from '../form';
import { login } from '../../slices/auth.js';
import Spinner from '../spinner/Spinner.jsx';
import routes from '../../routes';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        userName: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            userName: Yup.string().required('This field is required!'),
            password: Yup.string().required('This field is required!'),
        }),
        onSubmit: ({ userName, password }) => {
            setLoading(true);
            dispatch(login({ userName, password }))
                .unwrap()
                .then(() => {
                    setLoading(false);
                    navigate(routes.mainPage);
                })
                .catch(() => {
                    setLoading(false);
                });
        },
    });

    if (isLoggedIn) {
        navigate(routes.mainPage);
    }

    return (
        <div className="bg-gray-100 h-screen">
            <div className="container mx-auto max-w-md">
                <div className="card">
                    {message && <ErrorMessage message={message} />}
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Form
                            className="flex flex-col"
                            title="Sign in to your account"
                            onReset={formik.handleReset}
                            onSubmit={formik.handleSubmit}
                        >
                            {Object.keys(initialValues).map((value) => (
                                <Input
                                    name={value}
                                    key={value}
                                    touched={formik.touched[value]}
                                    error={formik.errors[value]}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[value]}
                                    onChange={formik.handleChange}
                                >
                                    {value}
                                </Input>
                            ))}
                            <SubmitButton
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                Login
                            </SubmitButton>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
