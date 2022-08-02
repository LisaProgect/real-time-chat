import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { Form, SubmitButton, Input, Container } from '../form';
import Spinner from '../spinner/Spinner.jsx';
import routes from '../../routes';
import validators from '../../validators.js';

const Register = ({ initialValues, title, validator, submitTitle, action }) => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: validators(t, validator),
        onSubmit: ({ userName, password }) => {
            setLoading(true);
            dispatch(action({ userName, password }))
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
                    title={title}
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
                        {submitTitle}
                    </SubmitButton>
                </Form>
            )}
        </Container>
    );
};

export default Register;
