import React from 'react';
import { useTranslation } from 'react-i18next';

const Label = ({ id, children }) => {
    const { t } = useTranslation();
    return (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {t(children)}:
        </label>
    );
};

const Input = ({ name, children, touched, error, ...rest }) => {
    const { t } = useTranslation();
    const clazz = `${
        touched && error ? 'input-error' : 'input'
    } border flex-1 block w-full rounded-md sm:text-sm text-sm my-3 py-2 px-2`;

    return (
        <div className="flex flex-col w-full">
            {children ? <Label id={name}>{children}</Label> : ''}
            <input className={clazz} id={name} {...rest} />
            {touched && error ? (
                <div className="text-sm text-red-600 pb-2">{t(error)}</div>
            ) : null}
        </div>
    );
};

export default Input;
