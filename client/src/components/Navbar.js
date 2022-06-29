import { observer } from 'mobx-react-lite';
import React, { useContext, useRef } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { Context } from '../index';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'; 
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import { Cart } from 'react-bootstrap-icons';


const Navigation = observer(() => {
    const {user} = useContext(Context)
    const navRef = useRef();
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole('USER')
    }
    console.log(user.role)
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink to={SHOP_ROUTE} className="d-flex flex-row justify-content-center align-items-center" style={{textDecoration: 'none',color: 'black'}}>
                    <img src={logo} alt="logo" style={{height: 45}}></img>
                    <p className='m-auto' style={{fontSize: 30}}>Airshop</p>
                </NavLink>
                {user.isAuth ?
                <Nav className="nav ml-auto" ref={navRef}>
                    <NavLink to={ADMIN_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}}>Admin panel</NavLink>
                    <NavLink to={SHOP_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}} onClick={() => logOut()}>Sign out</NavLink>
                    <NavLink to={BASKET_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}}>Basket <Cart /></NavLink>
                </Nav> 
                :
                <Nav className="nav ml-auto">
                    <NavLink to={LOGIN_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}}>Sign in</NavLink>
                    <NavLink to={REGISTRATION_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}}>Sign up</NavLink>
                    <NavLink to={BASKET_ROUTE} className="fs-6 fw-normal mx-2" style={{color: 'black', margin: 'auto', textDecoration: 'none'}}>Basket <Cart /></NavLink>
                </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default Navigation;