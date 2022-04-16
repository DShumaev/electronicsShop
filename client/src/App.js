import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { checkToken } from './http/userApi';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { Spinner } from 'react-bootstrap';

function App() {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkToken()
            .then((data) => {
                user.setIsAuth(true);
                user.setUser(data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="grow" />
    };

    return (
        <>
            <NavBar />
            <AppRouter />
        </>
    );
};

export default App;
