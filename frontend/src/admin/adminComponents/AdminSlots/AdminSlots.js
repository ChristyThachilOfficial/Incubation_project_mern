import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import AdminHeader from '../adminHeader/adminHeader'
import './AdminSlots.css'
import Swal from 'sweetalert2'

function AdminSlots() {
    
    const [slots, setSlots] = useState([])
    const history = useHistory()
    

    useEffect(() => {
        fetchAllSlots();
    }, [slots])

    const bookingStatusHandler = (id, seatNum) => {
        const applicationId = JSON.parse(localStorage.getItem('slotBookAppId'))
        try {
            const config = {
                headers: {
                    "Content-type" :"application/json"
                }
            }
            axios.patch('/api/admin/bookSlot', { id, seatNum, applicationId }, config)
            history.push('/admin')
        } catch {
            
        }
       
    }

    const addSlotHandler = () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            axios.post('/api/admin/addSlots', config).then(() => {
                fetchAllSlots();
            })
        } catch {
            console.log('error')
        }
    }

    const fetchAllSlots = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const allSlots = await axios.get('/api/admin/getAllSlots', config)

            setSlots(allSlots.data)

        } catch {

        }
    }

    return (
        <div>
            <AdminHeader />
            <Container>
                <Row>
                    <div style={{ marginTop: '70px' }}>
                        <Button onClick={() => addSlotHandler()}>Add slots</Button>
                        
                    </div>
                    
                </Row>
                <div style={{ marginTop: '50px' }}>
                    <span >
                        {
                            slots.map((slot,index) => {
                                return (
                                    <>
                                        
                                        <Button className={slot.isActive ? 'disabled' : ''} style={{ margin: '5px', width: '50px' }} onClick={() => {
                                            return (
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "Action can be undone!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, Book it!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        bookingStatusHandler(slot._id, index + 1)
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )
                                                    }
                                                })
                                            )
                                        }} variant={slot.isActive ? "danger" : "success"}>{index + 1 }</Button>
                                        
                                    </>
                                )
                            })
                        }

                    </span>
                </div>



            </Container>

        </div>
    )
}

export default AdminSlots
