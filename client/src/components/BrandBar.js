import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Dropdown, Row } from 'react-bootstrap';
import { Context } from '../index';

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const [name, setName] = useState('Choose Brand')
    return (
        <Dropdown>
            <Dropdown.Toggle>{name}</Dropdown.Toggle>
            <Dropdown.Menu>
                    {device.brands.map(brand =>
                        <Dropdown.Item
                            onClick={(e) => {
                                device.setSelectedBrand(brand)
                                setName(brand.name)
                            }}
                            key={brand.id}>
                                {brand.name}
                        </Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default BrandBar;