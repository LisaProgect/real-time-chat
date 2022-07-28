import React from 'react';

const Container = ({ children }) => (
    <div className="bg-gray-100 h-screen">
        <div className="container mx-auto max-w-md">
            <div className="card">{children}</div>
        </div>
    </div>
);

export default Container;
