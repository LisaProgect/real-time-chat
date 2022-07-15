import React from 'react';
import debug from 'debug';

const Input = ({ id, children, isInvalid, ...rest }) => {
    debug('debug:isInvalid')(isInvalid);
    const clazz = `${
        isInvalid ? 'input-error' : 'input'
    } border flex-1 block w-full rounded-md sm:text-sm text-sm my-3 py-2 px-2`;
    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {children}:
            </label>
            <input className={clazz} id={id} {...rest} />
        </div>
    );
};

export default Input;
