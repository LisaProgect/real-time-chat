import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { hideModal } from '../../slices/modals.js';
import ChannelRemoveModal from './ChannelRemoveModal.jsx';
import ChannelCreateModal from './ChannelCreateModal.jsx';
import ChannelUpdateModal from './ChannelUpdateModal.jsx';
import './modal.css';

const Modal = () => {
    const modal = useSelector((state) => state.modals);
    const dispatch = useDispatch();

    // eslint-disable-next-line functional/no-let
    let content = '';

    if (modal.type === 'remove') {
        content = <ChannelRemoveModal />;
    }
    if (modal.type === 'create') {
        content = <ChannelCreateModal />;
    }
    if (modal.type === 'update') {
        content = <ChannelUpdateModal />;
    }
    return (
        modal.status && (
            <div className="fixed left-0 top-0 bottom-0 right-0 z-50 backdrop-blur bg-black/60">
                <div className="bg-white absolute z-20 left-2/4 top-2/4 w-96 h-80 -ml-48 -mt-40 p-4 rounded-3xl">
                    {content}
                </div>
                <button
                    type="button"
                    className="absolute left-0 top-0 bottom-0 right-0 z-0"
                    onClick={() => dispatch(hideModal())}
                >
                    X
                </button>
            </div>
        )
    );
};

export default Modal;
