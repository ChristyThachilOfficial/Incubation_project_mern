
import { Container, Nav, Navbar} from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"


const AdminHeader = () => {
    const history = useHistory()
    const adminLogoutHandler = () => {
        localStorage.removeItem('adminInfo')
        history.push('/admin/login')
    }
    return (
        <>
            <Navbar bg="primary" expand="lg">
                <Container fluid>
                    <Navbar.Brand > <Link to='/admin' style={{textDecoration:'none' , color:'white'}}>INCUB. ADMIN</Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link ><Link to='/admin/viewApplications' style={{ textDecoration: 'none', color: 'white' }}>View Applications</Link></Nav.Link>
                            <Nav.Link ><Link to='/admin/ApplicationRecords' style={{ textDecoration: 'none', color: 'white' }}>Application records</Link></Nav.Link>
                            <Nav.Link ><Link to='/admin/viewSlots' style={{ textDecoration: 'none', color: 'white' }}>View Slots</Link></Nav.Link>
                            
                           
                        </Nav>

                        <Nav.Link style={{ textDecoration: 'none', color: 'white' }} onClick={() => adminLogoutHandler()} className='ms-auto'>Logout</Nav.Link>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </>
    )
}

export default AdminHeader