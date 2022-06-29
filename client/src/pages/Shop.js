import { observer } from 'mobx-react-lite';
import React, { useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/diviceAPI';
import Pages from '../components/Pages';
import ChooseBar from '../components/ChooseBar';
import Filters from '../components/Filters';

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(()=> {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 12).then(data => {
                device.setDevice(data.rows)
                device.setTotalCount(data.count)
        })
    }, [])

    useEffect(()=>{
            fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12).then(data => {
                device.setDevice(data.rows)
                device.setTotalCount(data.count)
        })
    }, [device.selectedType, device.selectedBrand, device.page])
    return (
        <Container>
            <Row>
                {/* <Col md={3}>
                    <Filters></Filters>
                </Col> */}
                <Col md={12}>
                    <ChooseBar />
                    <DeviceList/>
                    {device.setTotalCount ?
                    <Pages/>
                    :
                    <p class="fs-2">Sorry, but we don`t have such devices in our Shop</p>
                    }
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;