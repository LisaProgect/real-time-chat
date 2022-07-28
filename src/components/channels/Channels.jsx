import React from 'react';
import { useTranslation } from 'react-i18next';
import { CirclePlus } from '../svg';

const Item = ({ current, children }) => {
    const clazz = 'pl-4 border-l';
    return (
        <li
            className={
                current
                    ? `${clazz} text-sky-500 border-sky-500`
                    : `${clazz} hover:border-slate-400 hover:text-slate-900 border-transparent`
            }
        >
            {children}
        </li>
    );
};

const Channels = () => {
    const { t } = useTranslation();
    return (
        <div className="pl-5 lg:block">
            <span className="flex text-lg items-center">
                {t('Add new chat')}
                <button type="button" className="w-16 fill-indigo-500 p-5">
                    <CirclePlus />
                </button>
            </span>
            <ul className="border-l space-y-2 border-slate-100">
                <Item current={true}>Chat</Item>
                <Item current={false}>Chat</Item>
                <Item current={false}>Chat</Item>
            </ul>
        </div>
    );
};
export default Channels;
