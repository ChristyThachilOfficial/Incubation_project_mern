import { Button, Container, Form } from "react-bootstrap";
import { Link,useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";


const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            history.push('/')
        } else {
            
            history.push('/signup')
        }
    }, [history])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Password did not match')
        } else {

            try {

                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }

                setLoading(true)

                const { data } = await axios.post('/api/users/signup',
                    {
                        name,
                        email,
                        password
                    },
                    config
                )

                setLoading(false)

                history.push('/login')

            } catch {
                setError(error.response.data.message)
            }

        }

        
    }
    return (
        <div className="mainDiv">

            {error && <ErrorMessage variant="danger">{ error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}

            <Container>
                <div className=" d-flex align-items-center justify-content-center loginFormDiv">

                    <Form className="loginForm" onSubmit={submitHandler}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={name} type="text" placeholder="Enter Your name" onChange={(e) => setName(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required value={confirmPassword} type="password" placeholder="Retype your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Link style={{ textDecoration: 'none' }} to="/login">Login</Link>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Signup
                        </Button>
                    </Form>
                </div>
            </Container>

        </div>
    )
}

export default Signup;