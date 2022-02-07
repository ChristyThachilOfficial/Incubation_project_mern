
import { Button, CardContent, Typography, Card, Grid, TextField, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup } from '@material-ui/core'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Header from '../Header/Header'


const RegistrationForm = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [stateC, setStateC] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNum, setPhoneNum] = useState(0)
    const [companyName, setCompanyName] = useState('')
    const [companyBackground, setCompanyBackground] = useState('')
    const [companyProducts, setCompanyProducts] = useState('')
    const [facingProblem, setFacingProblem] = useState('')
    const [revenueModel, setRevenueModel] = useState('')
    const [marketSize, setMarketSize] = useState('')
    const [incubationType, setIncubationType] = useState('Physical')
    const [businessProposal, setBusinessProposal] = useState('')

    const history = useHistory()

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('userInfo'))._id
       
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/users/register',
                {
                    name,
                    address,
                    city,
                    stateC,
                    email,
                    phoneNum,
                    companyName,
                    companyBackground,
                    companyProducts,
                    facingProblem,
                    revenueModel,
                    marketSize,
                    incubationType,
                    businessProposal,
                    userId

                },config
            )

            history.push('/')
        } catch {
            console.log('hoi')
        }
    }

    return (
        <>
        <Header/>
        <div>
            <Container>
                <Typography gutterBottom variant='h3' align='center'>
                    New application form
                </Typography>
                <Card style={{ background: '#FFF1BD' }}>

                    <CardContent>

                        <form onSubmit={formSubmitHandler}>

                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6} item>
                                    <TextField value={name} onChange={(e) => setName(e.target.value)} label='Name' placeholder='Enter your first name' variant="filled" fullWidth required />
                                </Grid>

                                <Grid xs={12} sm={6} item>
                                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} label='Address' placeholder='Enter your first Address' variant="filled" fullWidth required />
                                </Grid>


                            </Grid>

                            <Grid container spacing={2}>

                                <Grid xs={12} sm={6} item>
                                    <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your city' variant="filled" fullWidth required />
                                </Grid>

                                <Grid xs={12} sm={6} item>
                                    <TextField value={stateC} onChange={(e) => setStateC(e.target.value)} label='State' placeholder='Enter your state' variant="filled" fullWidth required />
                                </Grid>

                            </Grid>

                            <Grid container spacing={2}>

                                <Grid xs={12} sm={6} item>
                                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant="filled" fullWidth required />
                                </Grid>

                                <Grid xs={12} sm={6} item>
                                    <TextField type='number' value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} label='Phone no.' placeholder='Enter your phone number' variant="filled" fullWidth required />
                                </Grid>

                            </Grid>



                            <Grid container spacing={2}>

                                <Grid xs={12} sm={6} item>
                                    <TextField label='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Enter your company name' variant="filled" fullWidth required />

                                </Grid>



                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField multiline rows={3} value={companyBackground} onChange={(e) => setCompanyBackground(e.target.value)} label='Company Background' placeholder='Describe your company background' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField multiline rows={3} value={companyProducts} onChange={(e) => { setCompanyProducts(e.target.value) }} label='Company Products' placeholder='Describe your company products' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField multiline rows={3} value={facingProblem} onChange={(e) => { setFacingProblem(e.target.value) }} label='Facing problem' placeholder='Describe your problem you are trying to solve' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField multiline rows={3} value={revenueModel} onChange={(e) => { setRevenueModel(e.target.value) }} label='Revenue model' placeholder='Explain your revenue model' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField multiline rows={3} value={marketSize} onChange={(e) => setMarketSize(e.target.value)} label='Potential market size' placeholder='Potential market size' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <FormControl style={{ marginLeft: '13px', marginTop: '15px' }} component="fieldset">
                                    <FormLabel component="legend">Type of incubation needed *</FormLabel>
                                    <RadioGroup
                                        aria-label="Incubation"
                                        value={incubationType}
                                        name="radio-buttons-group"
                                        onChange={(e) => { setIncubationType(e.target.value) }}
                                    >
                                        <FormControlLabel value="Physical" control={<Radio />} label="Physical incubation" />
                                        <FormControlLabel value="Virtual" control={<Radio />} label="Virtual incubation" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <TextField value={businessProposal} onChange={(e) => setBusinessProposal(e.target.value)} label='Business proposal' multiline rows={3} placeholder='Business proposal' variant="filled" fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={12} item>
                                    <Button type="submit" variant="contained" fullWidth>Submit</Button>
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

export default RegistrationForm