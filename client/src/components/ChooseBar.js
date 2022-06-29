import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import BrandBar from './BrandBar';
import TypeBar from './TypeBar';
import { Context } from '../index';
import { fetchTypes } from '../http/diviceAPI';
import { fetchBrands } from '../http/diviceAPI';

const ChooseBar = observer(() => {
    return (
        <Row className='choosen_bar justify-content-start mt-2' style={{width: 'auto'}}>
            <BrandBar />
            <TypeBar />
        </Row>
    );
});

export default ChooseBar;