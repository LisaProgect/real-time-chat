import React from 'react';
import { AngleLeft, UserGroup } from '../svg';
import Channel from '../channels';
import { Users } from '../users';

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
        <div className="flex justify-between h-screen">
            <Channel />

            <Users />
        </div>
    </>
);

export default MainPage;
