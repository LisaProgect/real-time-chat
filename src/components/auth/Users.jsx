import React from 'react';
import IconUser from '../users/IconUser.jsx';

const users = [{ name: 'Uasfadf' }, { name: 'asdfa' }, { name: 'asdfasdf' }];
const Users = () => (
    <div className="pl-5">
        <h3 className="text-lg py-5 pl-5">Users</h3>
        <ul>
            {users.map(({ name }, index) => (
                <li className="flex my-5 first:my-0 items-center" key={index}>
                    <IconUser name={name} /> {name}
                </li>
            ))}
        </ul>
    </div>
);

export default Users;
