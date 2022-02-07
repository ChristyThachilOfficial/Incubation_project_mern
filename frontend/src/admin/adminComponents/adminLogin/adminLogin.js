import { Button, Container, Form } from "react-bootstrap";
import React, {  useState,useEffect } from "react";
import './adminLogin.css'
import { useHistory } from "react-router-dom";

import axios from "axios";


import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

const AdminLogin = () => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    const history = useHistory()

    useEffect(() => {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
        if (adminInfo) {
            history.push('/admin')
        } else {
            history.push('/admin/login')
        }
        
    }, [history])
    

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true)

            const { data } = await axios.post("/api/admin/login",
                {
                    email,
                    password
                },
                config)
            
            localStorage.setItem('adminInfo', JSON.stringify(data))

            setLoading(false)
            history.push('/admin')

        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }

    }

    return (
        <div className="mainDiv">
            <Container>
                {error && <ErrorMessage variant="danger ">{error}</ErrorMessage>}
                {loading && <Loading />}
                <div className=" d-flex align-items-center justify-content-center loginFormDiv">
                    
                    
                    <Form className="loginForm" onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Admin mail</Form.Label>
                            <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </Container>

        </div>
    )
}

export default AdminLogin;