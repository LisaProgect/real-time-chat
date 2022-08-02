import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ConnectionContext } from '../../contexts/ConnectionContext.jsx';
import { hideModal } from '../../slices/modals.js';

const ChannelRemoveModal = () => {
    const { removeChannel } = useContext(ConnectionContext);
    const idChannel = useSelector((state) => state.modals.id);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-full justify-around items-stretch">
            <h3 className="self-center text-4xl text-gray-700">Are you sure</h3>
            <div className="self-center flex w-full">
                <button
                    className="bg-red-500 m-2 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white w-2/4"
                    type="button"
                    onClick={() => removeChannel({ id: idChannel })}
                >
                    {t('Yes')}
                </button>
                <button
                    className="bg-indigo-500 m-2 w-2/4 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-violet-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white"
                    type="button"
                    onClick={() => dispatch(hideModal())}
                >
                    {t('No')}
                </button>
            </div>
        </div>
    );
};

export default ChannelRemoveModal;
