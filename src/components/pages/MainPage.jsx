import React from 'react';

import { AngleLeft, UserGroup } from '../svg';
import Channel from '../channels';
import { Users } from '../users';
import Chat from '../chat';

const MainPage = () => (
    <>
        <div className="grid lg:hidden bg-white grid-cols-4 justify-around sticky z-40 top-0">
            <div
                className="w-8 p-2 fill-indigo-500 ml-6"
                onClick={() => console.log("I'am chat")}
            >
                <AngleLeft />
            </div>
            <div className="col-span-2 text-slate-700 justify-self-start self-center">
                <p className="text-sm">Chat Name</p>
            </div>
            <div
                className=" w-10 p-2 self-center justify-self-end mr-6 fill-indigo-500"
                onClick={() => console.log("I'm user")}
            >
                <UserGroup />
            </div>
        </div>
        <div className="max-w-8xl mx-auto text-slate-700">
            <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
                <Channel />
            </div>
            <div className="lg:pl-[12rem] max-w-5xl xl:pr-[11rem] mx-auto">
                <Chat />
            </div>
            <div className="fixed bg-white z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] overflow-y-auto hidden xl:block">
                <Users />
            </div>
        </div>
    </>
);

export default MainPage;
