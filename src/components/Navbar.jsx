import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes';

const ItemLink = ({ children, route }) => {
    const { t } = useTranslation();
    return (
        <Link
            to={route}
            className="hover:text-sky-500 dark:hover:text-sky-400 p-2"
        >
            {t(children)}
        </Link>
    );
};

const Image = () => (
    <img
        className="mx-auto h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
    />
);

const Navbar = () => (
    <nav className="lg:sticky top-0 z-40 w-full backdrop-blur  flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 dark:bg-transparent">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                <div className="relative flex items-center">
                    <Link
                        to={routes.mainPage}
                        className="mr-3 flex w-[2.0625rem] overflow-hidden md:w-auto"
                    >
                        <Image />
                        <p className="pl-5 font-medium text-xl">RealTimeChat</p>
                    </Link>
                    <div className="relative lg:flex items-center ml-auto">
                        <div className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200 space-x-9">
                            <ItemLink route={routes.loginPage}>Log in</ItemLink>
                            <ItemLink route={routes.signUpPage}>
                                Sign up
                            </ItemLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
