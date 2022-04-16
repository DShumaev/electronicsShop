import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };

    const getAdminPage = () => {
        if (user.user.role === 'ADMIN') {
            navigate(ADMIN_ROUTE)
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Electronics Shop</NavLink>
                {user.isAuth
                    ?
                    <Nav className="ms-auto">
                        {user.user.role === 'ADMIN' &&
                            <Button
                                variant="outline-light"
                                onClick={getAdminPage}
                            >
                                Admin Page
                            </Button>
                        }
                        <Button
                            variant="outline-light"
                            className="ms-2"
                            onClick={logOut}
                        >
                            Log out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto">
                        <Button
                            variant="outline-light"
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                        >
                            Sign up
                        </Button>
                        <Button
                            className="ms-1"
                            variant="outline-light"
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Log In
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
