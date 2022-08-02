import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { Form, Input, SubmitButton } from '../form';
import Spinner from '../spinner/Spinner.jsx';
import { ConnectionContext } from '../../contexts/ConnectionContext.jsx';
import validators from '../../validators.js';

const ChannelCreateModal = () => {
    const { addNewChannel } = useContext(ConnectionContext);

    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema: validators(t, 'channel'),
        onSubmit: (values) => {
            addNewChannel({ name: values.channelName });
            setIsLoading(true);
        },
    });

    return (
        <Form
            image={false}
            title="Create new channel"
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
        >
            <Input
                name="channelName"
                value={formik.values.channelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.channelName}
                touched={formik.touched.channelName}
            >
                Channel Name
            </Input>
            {isLoading ? (
                <Spinner />
            ) : (
                <SubmitButton className="w-full mt-4">Submit</SubmitButton>
            )}
        </Form>
    );
};

export default ChannelCreateModal;
