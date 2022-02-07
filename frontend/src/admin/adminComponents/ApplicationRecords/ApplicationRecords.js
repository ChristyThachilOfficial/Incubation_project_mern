import React from 'react'
import { useEffect,useState } from 'react'
import { Badge, Button, Container, ProgressBar, Row, Table } from 'react-bootstrap'
import AdminHeader from '../adminHeader/adminHeader'
import axios from 'axios'

function ApplicationRecords() {
    const [applications,setApplications] = useState([])
    useEffect(() => {
        fetchApplications();
    }, [])
    
    const fetchApplications = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get('/api/admin', config)
        setApplications(data)

    }

    return (
        <div>
            <AdminHeader />
            <Container>
                <Row className="rows">
                    <h1 style={{ marginBottom: '10px' }}>Applications</h1>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Company name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {



                                applications.map((application) => {
                                    return (
                                        <tr>

                                            <td>{application.companyName}</td>
                                            <td>{application.address}</td>
                                            <td>{application.email}</td>

                                            <td colSpan={3}>
                                                {
                                                    application.status !== 'rejected' ?
                                                        (<Table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Waiting</th>
                                                                    <th>Pending</th>
                                                                    <th>Approved</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan={3}>
                                                                        {application.status !== 'rejected' ?
                                                                            <ProgressBar style={{ width: '45em' }} animated now={application.status === 'waiting' ? 7 : application.status === 'pending' ? 50 : 100} /> :
                                                                            <span>Rejected</span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>) : <h5 style={{ color: 'red' }}>Rejected</h5>
                                                }
                                            </td>
                                            

                                        </tr>
                                    )
                                })


                            }

                        </tbody>
                    </Table>
                </Row>

                
            </Container>
        </div>
    )
}

export default ApplicationRecords
