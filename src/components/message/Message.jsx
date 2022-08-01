import React from 'react';
import { format } from 'timeago.js';

import { IconUser } from '../users';
import './message.css';

const Message = ({ message, own, user, createAt }) => (
    <div className={own ? 'flex  my-3 own' : 'flex  my-3 '}>
        <div className="flex flex-col items-center text-clip">
            <IconUser name={user} />
            <span className="text-xs">{user}</span>
        </div>

        <div className="message break-words">
            <p>{message}</p>
            <span className="text-xs pt-3 italic block">
                {format(createAt)}
            </span>
        </div>
    </div>
);

export default Message;
