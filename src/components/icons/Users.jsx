import React from 'react';
import { useSelector } from 'react-redux';

import { selectUsersByMessage } from '../../slices/messages.js';
import { selectCurrentChannel } from '../../slices/channels.js';
import IconUser from './IconUser.jsx';

const Users = () => {
    const currentChannel = useSelector(selectCurrentChannel);
    const users = useSelector((state) =>
        selectUsersByMessage(state, currentChannel)
    );

    return (
        <div className="pl-5">
            <h3 className="text-lg py-5 pl-5">Users</h3>
            <ul>
                {users.map(({ userName, userId }) => (
                    <li
                        className="flex my-5 first:my-0 items-center"
                        key={userId}
                    >
                        <IconUser name={userName} /> {userName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
