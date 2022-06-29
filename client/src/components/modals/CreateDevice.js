import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { fetchTypes, fetchBrands, createDev } from '../../http/diviceAPI';
import { Context } from '../../index';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(()=> {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info,{title: '', description: '', number: Date.now()}])
    }
    
    const removeInfo = (number) => {
        setInfo(info.filter(element => element.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDev(formData).then(data => onHide())
    }

    return (
        <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <div className='d-flex'>
                <Dropdown className='mx-2'>
                    <Dropdown.Toggle>{device.selectedType.name || 'Choose type'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type =>
                            <Dropdown.Item 
                                onClick={() => device.setSelectedType(type)} 
                                key={type.id}>
                                    {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle>{device.selectedBrand.name || 'Choose brand'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item 
                                onClick={() => device.setSelectedBrand(brand)} 
                                key={brand.id}
                                >
                                    {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Form.Control className="mt-3" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
            <Form.Control className="mt-3" placeholder="Enter price" type='number' value={price} onChange={e => setPrice(Number(e.target.value))}/>
            <Form.Control className="mt-3" placeholder="Add image" type='file' onChange={selectFile}/>
            <hr/>
            <Button variant={"outline-dark"} onClick={addInfo}>
                    Add new parameter
            </Button>
            {info.map(i =>
                <Row className='mt-2' key={i.number}>
                    <Col md={4}>
                        <Form.Control 
                            value={i.title}
                            onChange={(e)=>changeInfo('title', e.target.value, i.number)}                            
                            placeholder='Enter name of parameter'/>
                    </Col>
                    <Col md={4}>
                        <Form.Control 
                            value={i.description}
                            onChange={(e)=>changeInfo('description', e.target.value, i.number)}
                            placeholder='Enter description of parameter'/>
                    </Col>
                    <Col md={4}>
                        <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Delete</Button>
                    </Col>
                </Row>
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Close</Button>
        <Button variant='outline-success' onClick={addDevice}>Add</Button>
      </Modal.Footer>
    </Modal>
    );
});

export default CreateDevice;