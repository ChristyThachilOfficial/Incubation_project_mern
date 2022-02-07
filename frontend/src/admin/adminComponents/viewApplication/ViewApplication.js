
import { Button, CardContent, Typography, Card, Grid, TextField, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup } from '@material-ui/core'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AdminHeader from '../adminHeader/adminHeader'
import { useEffect } from 'react'



const ViewApplicationform = () => {
    const [application,setApplication] = useState({})
    const history = useHistory()
    const goHomeHandler = () => {
        history.push('/admin')
    }

    const fetchApplicationData =async () => {

        const applicationId = JSON.parse(localStorage.getItem('applicationId'))
        
        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }

        const { data } = await axios.get(`/api/admin/getApplication/${applicationId}`, config)
        console.log(data)
        setApplication(data)


        
    }

    useEffect(() => {
        
        fetchApplicationData();
    },[])
    

    return (
        <>
            <AdminHeader />
            <div>
                <Container>
                    <Typography gutterBottom variant='h3' align='center'>
                       
                    </Typography>
                    <Card style={{ background: '#FFF1BD' }}>

                        <CardContent>

                            <form >

                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Name</label>
                                        <TextField disabled value={application.name}    variant="filled" fullWidth  />
                                    </Grid>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Address</label>
                                        <TextField value={application.address} disabled   variant="filled" fullWidth  />
                                    </Grid>


                                </Grid>

                                <Grid container spacing={2}>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">City</label>
                                        <TextField  value={application.city}   variant="filled" fullWidth  disabled/>
                                    </Grid>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">State</label>
                                        <TextField value={application.stateC}   variant="filled" fullWidth disabled />
                                    </Grid>

                                </Grid>

                                <Grid container spacing={2}>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Email</label>
                                        <TextField value={application.email} type='email'  variant="filled" fullWidth  disabled/>
                                    </Grid>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Mobile number</label>
                                        <TextField value={application.phoneNum} type='number'   variant="filled" fullWidth  disabled/>
                                    </Grid>

                                </Grid>



                                <Grid container spacing={2}>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Company Name</label>
                                        <TextField value={application.companyName}  variant="filled" fullWidth  disabled/>

                                    </Grid>



                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Company Background</label>
                                        <TextField multiline value={application.companyBackground} rows={3}   variant="filled" fullWidth  disabled/>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Company Products</label>
                                        <TextField multiline rows={3} value={application.companyProducts}   variant="filled" fullWidth disabled />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Facing Problem</label>
                                        <TextField multiline rows={3} value={application.facingProblem}  variant="filled" fullWidth disabled />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Revenue Model</label>
                                        <TextField multiline rows={3} value={application.revenueModel}  variant="filled" fullWidth  disabled/>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Market Size</label>
                                        <TextField multiline rows={3} value={application.marketSize}   variant="filled" fullWidth  disabled/>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>

                                    <Grid xs={12} sm={6} item>
                                        <label htmlFor="">Incubation Type</label>
                                        <TextField value={application.incubationType}   variant="filled" fullWidth disabled/>

                                    </Grid>

                                    
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <label htmlFor="">Business Proposal</label>
                                        <TextField disabled value={application.businessProposal} multiline rows={3}  variant="filled" fullWidth disabled />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid xs={12} item>
                                        <Button type="button" onClick={() => goHomeHandler()} variant="contained" fullWidth>Go back</Button>
                                    </Grid>
                                </Grid>

                            </form>




                        </CardContent>
                    </Card>
                </Container>
            </div>
        </>

    )
}

export default ViewApplicationform