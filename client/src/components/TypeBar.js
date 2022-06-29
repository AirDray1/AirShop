import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Context } from '../index';

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const [name, setName] = useState('Choose type')
    return (
        <Dropdown>
            <Dropdown.Toggle>{name}</Dropdown.Toggle>
            <Dropdown.Menu>
                    {device.types.map(type =>
                        <Dropdown.Item
                            onClick={(e) => {
                                device.setSelectedType(type)
                                setName(type.name)
                            }}
                            key={type.id}>
                                {type.name}
                        </Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default TypeBar;