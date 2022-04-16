import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
    const [showType, setShowType] = useState(false);
    const [showBrand, setShowBrand] = useState(false);
    const [showDevice, setShowDevice] = useState(false);

    return (
        <Container>
            <Row>
                <Button
                    variant="outline-dark"
                    className="mt-4 p-2"
                    onClick={() => setShowType(true)}
                >
                    Add type of device
                </Button>
                <Button
                    variant="outline-dark"
                    className="mt-4 p-2"
                    onClick={() => setShowBrand(true)}
                >
                    Add brand of device
                </Button>
                <Button
                    variant="outline-dark"
                    className="mt-4 p-2"
                    onClick={() => setShowDevice(true)}
                >
                    Add device
                </Button>
            </Row>
            <CreateType show={showType} onHide={() => setShowType(false)} />
            <CreateBrand show={showBrand} onHide={() => setShowBrand(false)} />
            <CreateDevice show={showDevice} onHide={() => setShowDevice(false)} />
        </Container>
    );
};

export default Admin;
