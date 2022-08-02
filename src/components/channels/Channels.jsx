import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    selectAllChannels,
    selectCurrentChannel,
    setCurrentChannel,
} from '../../slices/channels.js';
import { showModal } from '../../slices/modals.js';
import { CirclePlus, Trash, Pencil } from '../icons';

const Item = ({ current, children, isRemove, id }) => {
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
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => dispatch(setCurrentChannel(id))}
                >
                    {children}
                </button>
                <div>
                    {isRemove && (
                        <button
                            type="button"
                            className="w-8 p-2 border border-rose-500 rounded-md hover:bg-rose-500 hover:fill-white fill-red-500"
                            onClick={() =>
                                dispatch(showModal({ type: 'remove', id }))
                            }
                        >
                            <Trash />
                        </button>
                    )}
                    <button
                        type="button"
                        className="w-8 p-2 border ml-4 border-indigo-500 rounded-md hover:bg-indigo-500 hover:fill-white fill-indigo-500"
                        onClick={() =>
                            dispatch(showModal({ type: 'update', id }))
                        }
                    >
                        <Pencil />
                    </button>
                </div>
            </div>
        </li>
    );
};

const Channels = () => {
    const { t } = useTranslation();
    const channels = useSelector(selectAllChannels);
    const currentChannel = useSelector(selectCurrentChannel);
    const dispatch = useDispatch();

    return (
        <div className="pl-5 lg:block">
            <span className="flex text-lg items-center">
                {t('Add new chat')}
                <button
                    type="button"
                    className="w-16 fill-indigo-500 p-5"
                    onClick={() =>
                        dispatch(showModal({ type: 'create', id: null }))
                    }
                >
                    <CirclePlus />
                </button>
            </span>
            <ul className="border-l space-y-2 border-slate-100">
                {channels.map((channel) => (
                    <Item
                        key={channel.id}
                        id={channel.id}
                        isRemove={channel.removable}
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
