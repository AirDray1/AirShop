import React, { useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import star from '../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { Cart } from 'react-bootstrap-icons';

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    const pushNavigate = () =>{
        navigate(("/device") + ("/") + (device.id))
    }

    return (
        <Col md="3" onClick={pushNavigate}>
            <Card style={{width: "100%", cursor: 'pointer', border: 'light'}}>
                <Image width="100%" src={'http://localhost:5000/' + device.img}/>
                <div className="d-flex justify-content-between m-1">
                    <div className='text-black-50'>Samsung</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} width={13} height={13}/>
                    </div>
                </div>
                <div className="mx-1">{device.name}</div>
                <Row className="buy_btn d-flex flex-row mx-1 mt-1 align-items-center justify-content-between">
                    <span style={{padding: 0}}>{device.price} ₴</span>
                    <Button className='primary'><Cart /></Button>
                </Row>
            </Card>
        </Col>
    );
};

export default DeviceItem;