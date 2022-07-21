import React from 'react';

const Label = ({ id, children }) => (
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {children}:
    </label>
);

const Input = ({ id, children, isInvalid, ...rest }) => {
    const clazz = `${
        isInvalid ? 'input-error' : 'input'
    } border flex-1 block w-full rounded-md sm:text-sm text-sm my-3 py-2 px-2`;

    return (
        <div className="flex flex-col w-full">
            {children ? <Label id={id}>{children}</Label> : ''}
            <input className={clazz} id={id} {...rest} />
        </div>
    );
};

export default Input;
