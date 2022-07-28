import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = ({ children }) => {
    const { t } = useTranslation();
    return (
        <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
            {t(children)}
        </h2>
    );
};
const Image = () => (
    <img
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
    />
);

const Form = ({ image = true, title, children, ...rest }) => (
    <form {...rest}>
        {image ? <Image /> : ''}
        {title ? <Title>{title}</Title> : ''}
        {children}
    </form>
);

export default Form;
