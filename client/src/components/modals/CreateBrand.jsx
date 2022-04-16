import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceApi';

const CreateBrand = ({ show, onHide }) => {
    const [brand, setBrand] = useState('');

    const addBrand = () => {
        createBrand({name: brand})
            .then((data) => setBrand(''));
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
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
