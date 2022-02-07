import { Badge, Button, Card, Modal } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import MainScreen from "../../components/Header/MainScreen"
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios'
import Header from "../../components/Header/Header"





const MyApplications = () => {
    const [applications, setApplications] = useState([])
    const [show ,setShow] = useState(false)

    const history = useHistory()


    const fetchApplications = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const userId = JSON.parse(localStorage.getItem('userInfo'))._id
        const { data } = await axios.get(`/api/users/${userId}`, config)
        setApplications(data)
    }

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            fetchApplications();
        } else {
            history.push('/login')
        }


    }, [history])

    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)

    const deleteHandler = (id) => {
        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        axios.delete(`/api/users/${id}`, config)
        hideModal()
        fetchApplications();
    }

    return (
        <>
        <Header/>
        <div>
            <MainScreen title='welcome back'>
                <Link to='/apply'>
                    <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                        Apply
                    </Button>
                </Link>
                {
                    applications.map((application) => (
                        <Accordion key={application._id}>
                            <Accordion.Item eventKey="0">
                                <Card style={{ margin: 10 }}>
                                    <Card.Header style={{ display: 'flex' }}>
                                        <span style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                            flex: 1,
                                            cursor: 'pointer',
                                            alignSelf: 'center',
                                            fontSize: 18
                                        }}><Accordion.Header>{application.companyName}</Accordion.Header></span>



                                        <div>
                                            
                                            <Button variant="danger" className="mx-2" onClick={showModal}>Delete</Button>
                                            <Modal show={show} onHide={hideModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Delete</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={hideModal}>
                                                        Close
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteHandler(application._id)}>
                                                        Delete
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </Card.Header>
                                        
                                    <Accordion.Collapse eventKey='0'>

                                        <Card.Body>

                                            <h4>
                                                <Badge pill bg={(application.status === "pending") ? "info" : (application.status === "approved") ? "success" : (application.status === "waiting") ? "warning" : "danger"} >Status - {application.status}</Badge>
                                            </h4>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                  EMAIL :  {application.email}

                                                </p>
                                                <p>PH : {application.phoneNum}</p>
                                                <p>CITY : {application.city}</p>
                                                <p>INCUBATION TYPE : {application.incubationType}</p>
                                                <footer className="blockquote-footer">
                                                    Created on Date : {application.createdAt}
                                                </footer>
                                            </blockquote>
                                        </Card.Body>

                                    </Accordion.Collapse>



                                </Card>
                            </Accordion.Item>
                        </Accordion>

                    ))
                }


            </MainScreen>
            </div>
            
        </>
    )
}

export default MyApplications