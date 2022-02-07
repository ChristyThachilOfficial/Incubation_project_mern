import axios from "axios"
import { useEffect, useState } from "react"
import { Badge, Button, Container, Modal, Row, Table } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import AdminHeader from "../adminHeader/adminHeader"
import './AdminHome.css'

const AdminHome = () => {
    const [newApplications,setNewApplications] = useState([])
    const [pendingApplications, setPendingApplications] = useState([])
    const [show, setShow] = useState(false)
    

    const history = useHistory()

    const fetchApplications = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get('/api/admin', config)

        let newApplication = data.filter((application) => {
            return application.status === 'waiting'
        })

        setNewApplications(newApplication)

        let pendingApplication = data.filter((application) => {
            return application.status === "pending";
        }) 

        setPendingApplications(pendingApplication)
        

        
    }

    const AcceptApplicationHandler = (id) => {
        const config = {
            headers: {
                    "Content-type" : "application/json"
                }
        }
        
        axios.patch(`/api/admin/AcceptApplication/${id}`, config)
        
    }

    const ApplicationRejectHandler = (id) => {
        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }

        axios.patch(`/api/admin/rejectApplication/${id}`, config)
        hideModal();
    }

    const viewApplicationHandler = (id) => {
        localStorage.setItem('applicationId', JSON.stringify(id))
        history.push('/admin/viewApplication')
    }

    const slotBookingHandler = (id) => {
        localStorage.setItem('slotBookAppId', JSON.stringify(id))
        history.push('/admin/bookSlot')
    }



    useEffect(() => {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
        if (adminInfo) {
            fetchApplications();
            
 
        } else {
            history.push('/admin/login')
        }

    }, [newApplications, pendingApplications])
    
    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)

    return (
        <>
            <AdminHeader />
            <Container>
                {
                    newApplications.length === 0 ? <h1 style={{ color: 'red' }}>No new applications</h1> 
                        
                        :

                        <Row className="rows">
                            <h1 style={{ marginBottom: '10px' }}>New Applications</h1>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Company name</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>Open</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {



                                        newApplications.map((application) => {
                                            return (
                                                <tr>

                                                    <td>{application.companyName}</td>
                                                    <td>{application.address}</td>
                                                    <td>{application.email}</td>

                                                    <td><Button onClick={() => viewApplicationHandler(application._id)} variant="warning">Open</Button></td>
                                                    <td className="d-flex"><Button variant="success" onClick={() => AcceptApplicationHandler(application._id)}>Accept</Button>
                                                        <Button onClick={showModal} variant="danger" style={{ marginLeft: '5px' }}>Reject</Button>
                                                        <Modal show={show} onHide={hideModal}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Reject</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>Are you sure you want to reject this application?</Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={hideModal}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="danger" onClick={() => ApplicationRejectHandler(application._id)}>
                                                                    Delete
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </td>

                                                </tr>
                                            )
                                        })


                                    }


                                </tbody>
                            </Table>
                        </Row>
                }

                

                <Row className="rows">
                    <h1 style={{ marginBottom: '10px' }}>Pending Applications</h1>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Company name</th>
                                <th>Address</th>
                                <th>Email</th>
                                
                                <th>Type</th>
                                <th>Slot booking</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                

                                
                                pendingApplications.map((application) => {
                                    return(
                                    <tr>
                                        
                                        <td>{ application.companyName}</td>
                                        <td>{ application.address}</td>
                                        <td>{ application.email}</td>
                                        
                                        <td>{application.incubationType}</td>
                                        <td><Button variant="warning" onClick={()=> slotBookingHandler(application._id)}>Book slot</Button></td>
                                        
                                    </tr>
                                )
                                })
                                    
                                
                            }


                        </tbody>
                    </Table>
                </Row>

                
            </Container>
        </>
    )
}

export default AdminHome