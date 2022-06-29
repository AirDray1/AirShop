import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Container, Form, Button} from 'react-bootstrap';
import {useLocation, NavLink, useNavigate} from 'react-router-dom'
import { Context } from '../index';
import { registration, login } from '../http/userApi';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    

    const click = async () => {
        try {
            let data;
            if(isLogin){
                data = await login(email, password);
            }
            else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch(e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container 
            className='d-flex justify-content-center align-items-center flex-column'
        >
            <Card className="mt-5" style={{width: 420}}>
                <h2 className='m-auto'>{isLogin ? 'Sign in to AirShop' : 'Sign up to AirShop'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter your e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type='password'
                        className="mt-2"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
            {isLogin ?
                    <Button className="mt-2 btn-success" onClick={click}>
                        Sign in
                    </Button>
                :
                    <Button className="mt-2 btn-success" onClick={click}>
                        Regestrate
                    </Button>
            }
                </Form>
            {isLogin ?
                <Form className="d-flex justify-content-center align-items-center flex-row mt-2 mb-2">
                    <p className="justify-content-center align-items-center" style={{margin: 0}}>New to AirShop?</p>
                    <NavLink className="mr-5 p-0" to={REGISTRATION_ROUTE}>
                        Create an accaunt.
                    </NavLink>
                </Form>
                :
                <Form className="d-flex justify-content-center align-items-center flex-row mt-2 mb-2">
                    <p className="justify-content-center align-items-center" style={{margin: 0}}>Do you have account?</p>
                    <NavLink className="mr-5 p-0" to={LOGIN_ROUTE}>
                        Log in.
                    </NavLink>
                </Form>
            }
            </Card>
        </Container>
    );
});

export default Auth;