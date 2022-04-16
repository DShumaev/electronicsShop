import React, { useContext, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../../index';
import { createDevice } from '../../http/deviceApi';

const CreateDevice = ({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo(prev => [...prev, {title: '', description: '', number: Date.now()}]);
    };
    const removeInfo = (deletedInfoId) => {
        setInfo(prev => prev.filter((infoItem) => infoItem.number !== deletedInfoId));
    };
    const selectFiles = (e) => {
        setFile(e.target.files[0]);
    };
    const changeInfo = (inputName, inputValue, number) => {
        setInfo(prev => prev.map(option =>
            option.number === number ? {...option, [inputName]: inputValue} : option));
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('deviceTypeId', type.id);
        formData.append('deviceBrandId', brand.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(() => onHide());
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
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{type?.name || 'Choose type of device'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) =>
                                <Dropdown.Item onClick={() => setType(type)}>
                                    {type.name}
                                </Dropdown.Item>
                            )}

                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{brand?.name || 'Choose brand of device'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) =>
                                <Dropdown.Item onClick={() => setBrand(brand)}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Enter name of device"
                    >
                    </Form.Control>
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Enter price of device"
                        type="number"
                    >
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter image of device"
                        type="file"
                        onChange={selectFiles}
                    >
                    </Form.Control>
                    <hr />
                    <Button onClick={addInfo} className="mb-2">
                        Add new descriptions property
                    </Button>
                    {
                        info.map(item =>
                            <Row key={item.number} className="mt-2">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Enter name of property"
                                        value={item.title}
                                        onChange={(e) => changeInfo('title', e.target.value, item.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Enter value of property"
                                        value={item.description}
                                        onChange={(e) => changeInfo('description', e.target.value, item.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeInfo(item.number)}
                                    >
                                        Delete
                                    </Button>

                                </Col>
                            </Row>
                        )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
