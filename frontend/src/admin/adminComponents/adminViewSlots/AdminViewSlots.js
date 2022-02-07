import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import AdminHeader from '../adminHeader/adminHeader'
import './AdminViewSlots.css'

function AdminViewSlots() {

    const [slots, setSlots] = useState([])
    const history = useHistory()


    useEffect(() => {
        fetchAllSlots();
    }, [])

    

    // const addSlotHandler = () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         }

    //         axios.post('/api/admin/addSlots', config).then(() => {
    //             fetchAllSlots();
    //         })
    //     } catch {
    //         console.log('error')
    //     }
    // }

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
                {/* <Row>
                    <div style={{ marginTop: '70px' }}>
                        <Button onClick={() => addSlotHandler()}>Add slots</Button>
                    </div>
                </Row> */}
                <div style={{ marginTop: '50px' }}>
                    <span >
                        {
                            slots.map((slot, index) => {
                                return (
                                    <>
                                        <Button style={{ margin: '5px', width: '50px' }}  variant={slot.isActive ? "danger" : "success"}>{index + 1}</Button>

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

export default AdminViewSlots;
