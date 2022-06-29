import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import star from '../assets/star.png';
import { CartPlus } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/diviceAPI';

const DevicePage = () => {
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    return (
        <Container>
            <Row className="d-flex flex-row justify-content-between" style={{width: 'auto'}}>
                <h2  className="d-flex" style={{width: 'auto'}}>{device.name}</h2>
                <div className="d-flex flex-direction-row align-items-center" style={{width: 'auto'}}>
                    <p className="m-auto mr-1">Users rating {device.rating}</p>
                    <Image src={star} width={13} height={13}/>
                </div>
            </Row>
            <Row style={{width: '100%', margin: 0}}>
                <Card className="flex-row" style={{padding: 0, width: '100%'}}>
                    <Col md={6}>
                        <Card>
                            <Carousel variant="dark">
                                <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={"http://localhost:5000/" + device.img}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Card>
                    </Col>
                    <Col md={6} className='d-flex justify-content-between'>
                        <Card className="d-flex justify-content-center align-items-center flex-row" style={{height:'17%', width: "100%"}}>
                            <div className="mx-2">
                                <h5>Price</h5>
                                <h5 className='text-black-50'>{device.price} грн.</h5>
                            </div>
                            <div>
                                <Button><CartPlus /> Add to cart</Button>
                            </div>
                        </Card>
                    </Col>
                </Card>
            </Row>
        </Container>
    );
};

export default DevicePage;