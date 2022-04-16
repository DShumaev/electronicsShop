import React, { useContext, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { fetchBrands, fetchDevice, fetchTypes } from '../http/deviceApi';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes()
            .then((data) => device.setTypes(data));
        fetchBrands()
            .then((data) => device.setBrands(data));
    }, [])

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.currentPage, device.pageLimitRecord)
            .then((data) => {
                    device.setDevices(data.rows);
                    device.setPageTotalRecord(data.count);
            });
    }, [device.currentPage, device.selectedType, device.selectedBrand]);

    const clearFilter = () => {
        device.setSelectedType({});
        device.setSelectedBrand({});
    };

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                    <Button
                        className="mt-4"
                        onClick={clearFilter}
                    >
                        Clear filters
                    </Button>
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
