import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceApi';

const CreateType = ({ show, onHide }) => {
    const [type, setType] = useState('');

    const addType = () => {
        createType({name: type})
            .then((data) => setType(''));
        onHide();
    };

    return (
        <Modal
            show={show}
            size="lg"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add type of product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Types name"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
