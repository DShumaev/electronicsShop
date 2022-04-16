import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Container, Form, Card, Button } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInUp = async () => {
        if (!(email && password)) {
            return;
        }
        try {
            if (isLogin) {
                const userData = await login(email, password);
                user.setUser(userData);
                user.setIsAuth(true);
                navigate(SHOP_ROUTE);
            } else {
                const response = await registration(email, password);
                navigate(LOGIN_ROUTE);
            };
        } catch (e) {
            alert(e.message)
        };
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="email"
                    />
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="password"
                        type="password"
                    />
                    <Container className="d-flex justify-content-between mt-3 p-0">
                        {isLogin
                            ?
                            <div>
                                Do you haven't account? <NavLink to={REGISTRATION_ROUTE}>Sign Up!</NavLink>
                            </div>
                            :
                            <div>
                                Do you have account? <NavLink to={LOGIN_ROUTE}>Log In!</NavLink>
                            </div>
                        }
                        <Button
                            variant="outline-success"
                            onClick={signInUp}
                        >
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
