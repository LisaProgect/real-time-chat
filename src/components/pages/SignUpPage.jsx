import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Form, SubmitButton, Input, Container } from '../form';
import { signup } from '../../slices/auth.js';
import Spinner from '../spinner/Spinner.jsx';
import routes from '../../routes';

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const initialValues = {
        userName: '',
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(2, t('short'))
                .max(20, t('long'))
                .required(t('required')),
            password: Yup.string().min(2, t('short')).required(t('required')),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], t('notSame'))
                .required(t('required')),
        }),
        onSubmit: ({ userName, password }) => {
            setLoading(true);
            dispatch(signup({ userName, password }))
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

    useEffect(() => {
        if (isLoggedIn) {
            navigate(routes.mainPage);
        }
    }, [isLoggedIn, navigate]);

    return (
        <Container>
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
                        SignUp
                    </SubmitButton>
                </Form>
            )}
        </Container>
    );
};

export default SignUpPage;
