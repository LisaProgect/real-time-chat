import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorMessage = ({ message }) => {
    const { t } = useTranslation();
    return (
        <div className="mx-auto text-center bg-red-300 block p-4 m-2 rounded-2xl text-gray-600">
            {t(message)}
        </div>
    );
};

export default ErrorMessage;
