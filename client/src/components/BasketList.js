import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import BasketItem from './BasketItem';

const BasketList = observer(() => {
    const {user} = useContext(Context)
    console.log(user.basket)
    return (
        <div>
            Basket
        </div>
        // <Row className="d-flex flex-direction-row mt-2">
        //     {user.basket.map(device =>
        //         <BasketItem key={device.id} device={device}/>
        //     )}
        // </Row>
    );
});

export default BasketList;