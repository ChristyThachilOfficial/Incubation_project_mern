import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import React from 'react'

const Header = () => {
    const history = useHistory()

    const userLoggedIn = JSON.parse(localStorage.getItem('userInfo'))
    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand >
                        <Link to="/" onClick={(e) => {
                            e.preventDefault()
                            const userInfo = localStorage.getItem('userInfo')
                            if (userInfo) {
                                history.push('/')
                            } else {
                                history.push('/login')
                            }
                        }} style={{ textDecoration: 'none' }}>

                            INCUBATION
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >




                        </Nav>

                        


                                <Nav.Link className='ms-auto' onClick={() => {
                                    localStorage.removeItem('userInfo')
                                    history.push('/incub')

                                }}>Logout</Nav.Link>
                               



                        




                    </Navbar.Collapse>
                </Container>
            </Navbar >

        </>


    )
}

export default Header