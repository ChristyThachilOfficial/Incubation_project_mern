import { Button, Container, Row } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect } from "react"
import './LandingPage.css'
import Header from "../../components/Header/Header"

const LandingPage = () => {
    const history = useHistory()
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            history.push('/myApplications')
        } 
    }, [history])
    return (
        
        <>
            
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to INCUB.</h1>
                            
                        </div>
                        <div className="buttonContainer">
                            <Link to="/login">
                                <Button size="1g" className="landingbutton" >Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="1g" className="landingbutton" variant="outline-primary">Signup</Button>
                            </Link>
                        </div>
                    </div>
                </Row>
            </Container>
            </div>
        </>
    )
}

export default LandingPage