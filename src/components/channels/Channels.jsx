import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    selectAllChannels,
    selectCurrentChannel,
    setCurrentChannel,
} from '../../slices/channels.js';
import { CirclePlus } from '../svg';

const Item = ({ current, children, id }) => {
    const clazz = 'pl-4 border-l';
    const dispatch = useDispatch();

    return (
        <li
            className={
                current
                    ? `${clazz} text-sky-500 border-sky-500`
                    : `${clazz} hover:border-slate-400 hover:text-slate-900 border-transparent`
            }
        >
            <button
                type="button"
                onClick={() => dispatch(setCurrentChannel(id))}
            >
                {children}
            </button>
        </li>
    );
};

const Channels = () => {
    const { t } = useTranslation();
    const channels = useSelector(selectAllChannels);
    const currentChannel = useSelector(selectCurrentChannel);

    return (
        <div className="pl-5 lg:block">
            <span className="flex text-lg items-center">
                {t('Add new chat')}
                <button type="button" className="w-16 fill-indigo-500 p-5">
                    <CirclePlus />
                </button>
            </span>
            <ul className="border-l space-y-2 border-slate-100">
                {channels.map((channel) => (
                    <Item
                        key={channel.id}
                        id={channel.id}
                        current={currentChannel === channel.id}
                    >
                        {channel.name}
                    </Item>
                ))}
            </ul>
        </div>
    );
};
export default Channels;
