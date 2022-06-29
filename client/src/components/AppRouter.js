import React, { useContext } from 'react';
import {Routes, Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import Shop from '../pages/Shop'
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Basket from '../pages/Basket';
import DevicePage from '../pages/DevicePage';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {/* {authRoutes.map(({path, Component})=>
                // console.log(Component)
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                // console.log({path, Component});
                <Route key={path} path={path} element={Component} exact/>
            )} */}
            
            <Route key={"/"} path={"/"} element={<Shop/>} exact/>
            {(user.isAith = true) && <Route key={"/"} path={"/admin"} element={<Admin/>} exact/>}
            <Route key={"/"} path={"/login"} element={<Auth/>} exact/>
            <Route key={"/"} path={"/registration"} element={<Auth/>} exact/>
            {(user.isAith = true) && <Route key={"/"} path={"/basket"} element={<Basket/>} exact/>}
            <Route key={"/"} path={"/device" + '/:id'} element={<DevicePage/>} exact/>
        </Routes>
        // console.log(publicRoutes) 
    );
};

export default AppRouter;