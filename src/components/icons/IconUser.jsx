import React from 'react';

const IconUser = ({ name }) => (
    <span className="bg-orange-200 text-lg uppercase p-3 h-10 w-10 text-center rounded-full block mx-2 leading-none">
        {name ? name[0] : ''}
    </span>
);

export default IconUser;
