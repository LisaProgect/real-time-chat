import React from 'react';

const Form = ({ title, children, ...rest }) => (
    <form {...rest}>
        <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
        />
        <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
        </h2>
        <div className="flex flex-col">{children}</div>
    </form>
);

export default Form;
