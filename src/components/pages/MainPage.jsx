import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AngleLeft, UserGroup } from '../svg';
import Channel from '../channels';
import { Users } from '../users';
import Chat from '../chat';
import { fetchMessages } from '../../slices/messages.js';
import routes from '../../routes';
import './pages.css';

const MainPage = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate(routes.loginPage);
        }
    }, [currentUser, navigate]);

    const [modalWindow, setModalWindow] = useState(null);

    const messagesStatus = useSelector((state) => state.messages.status);

    useEffect(() => {
        if (messagesStatus === 'idle') {
            dispatch(fetchMessages());
        }
    }, [dispatch, messagesStatus]);

    const handlerModalClick = (typeModal) => {
        if (modalWindow === typeModal) {
            setModalWindow(null);
        } else {
            setModalWindow(typeModal);
        }
    };

    return (
        currentUser && (
            <>
                <div className="grid xl:hidden bg-white grid-cols-4 justify-around fixed z-40 top-[73px] left-0 right-0">
                    <button
                        type="button"
                        className="w-8 p-2 fill-indigo-500 ml-6"
                        onClick={() => handlerModalClick('channel')}
                    >
                        <AngleLeft />
                    </button>
                    <div className="col-span-2 text-slate-700 justify-self-start self-center">
                        <p className="text-sm">Chat Name</p>
                    </div>
                    <button
                        className=" w-10 p-2 self-center justify-self-end mr-6 fill-indigo-500"
                        onClick={() => handlerModalClick('user')}
                        type="button"
                    >
                        <UserGroup />
                    </button>
                </div>
                <div className="max-w-8xl mx-auto text-slate-700 channels">
                    <div
                        className={`${modalWindow} bg-white hidden xl:block fixed z-20 inset-0 top-28 xl:top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto`}
                    >
                        <Channel />
                    </div>
                    <div className="xl:pl-[12rem] max-w-5xl xl:pr-[11rem] mx-auto">
                        <Chat
                            currentUser={{
                                userName: currentUser.userName,
                                userId: currentUser.userId,
                            }}
                        />
                    </div>
                    <div
                        className={`${modalWindow} fixed bg-white z-20 xl:top-[3.8125rem] top-28 bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] overflow-y-auto hidden xl:block`}
                    >
                        <Users />
                    </div>
                </div>
            </>
        )
    );
};

export default MainPage;
