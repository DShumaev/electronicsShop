import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row className="d-flex" xs="auto">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand?.id ? 'danger' : 'light'}
                    className="p-3 me-1"
                    style={{ cursor: 'pointer' }}
                >
                    { brand.name }
                </Card>)
            }
        </Row>
    );
});

export default BrandBar;
