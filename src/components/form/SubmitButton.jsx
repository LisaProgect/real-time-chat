import React from 'react';

const SubmitButton = ({ children, className }) => (
    <button
        type="submit"
        className={`bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-violet-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${className}`}
    >
        {children}
    </button>
);

export default SubmitButton;
