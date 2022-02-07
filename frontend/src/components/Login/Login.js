import { Button, Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import './Login.css'
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    

    const history = useHistory()

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            
            history.push('/')
        } else {
            history.push('/login')
        }
    },[history])

    
    const submitHandler =async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true)

            const { data } = await axios.post("/api/users/login",
                {
                    email,
                    password
                },
                config) 
            console.log(data)
            localStorage.setItem('userInfo',JSON.stringify(data))

            setLoading(false)
            history.push('/')

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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Link style={{ textDecoration: 'none' }} to="/signup">Signup</Link>
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

export default Login;