import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { Form, Input, SubmitButton } from '../form';
import Spinner from '../spinner/Spinner.jsx';
import { ConnectionContext } from '../../contexts/ConnectionContext.jsx';
import { selectChannelById } from '../../slices/channels';
import validators from '../../validators.js';

const ChannelUpdateModal = () => {
    const { renameChannel } = useContext(ConnectionContext);
    const idChannel = useSelector((state) => state.modals.id);
    const channel = useSelector((state) => selectChannelById(state, idChannel));

    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            channelName: channel.name,
        },
        validationSchema: validators(t, 'channel'),
        onSubmit: (values) => {
            renameChannel({ name: values.channelName, id: idChannel });
            setIsLoading(true);
        },
    });

    return (
        <Form
            image={false}
            title="Update channel"
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

export default ChannelUpdateModal;
