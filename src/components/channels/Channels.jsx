import React from 'react';
import { CirclePlus } from '../svg';

const Channels = () => (
    <div className="text-slate-700  pl-5 lg:block">
        <span className="flex text-lg items-center">
            Add new chat
            <button type="button" className="w-16 fill-indigo-500 p-5">
                <CirclePlus />
            </button>
        </span>
        <ul className="border-l space-y-2 border-slate-100">
            <li className="pl-4 border-l text-sky-500 border-sky-500">Chat</li>
            <li className="pl-4 border-transparent border-l hover:border-slate-400 hover:text-slate-900">
                Chat
            </li>
        </ul>
    </div>
);

export default Channels;
