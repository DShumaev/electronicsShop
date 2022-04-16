import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';

const AppRouter = () => {
    const { user } = useContext(Context);

    return (
        <>
            <Routes>
                {user.isAuth && authRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )}
                {publicRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )}
            </Routes>
        </>
    );
};

export default AppRouter;
