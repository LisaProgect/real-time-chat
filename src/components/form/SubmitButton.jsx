import React from 'react';
import { useTranslation } from 'react-i18next';

const SubmitButton = ({ children, disabled = false, className }) => {
    const { t } = useTranslation();
    return (
        <button
            disabled={disabled}
            type="submit"
            className={`bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-violet-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${className}`}
        >
            {t(children)}
        </button>
    );
};

export default SubmitButton;
