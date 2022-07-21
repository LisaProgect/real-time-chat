import React from 'react';
import IconUser from './IconUser.jsx';

const users = [{ name: 'Uasfadf' }, { name: 'asdfa' }, { name: 'asdfasdf' }];
const Users = () => (
    <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
        <ul>
            {users.map(({ name }, index) => (
                <li key={index}>
                    <IconUser name={name} /> {name}
                </li>
            ))}
        </ul>
    </div>
);

export default Users;
