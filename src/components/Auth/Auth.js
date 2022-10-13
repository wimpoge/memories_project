import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles.js'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import { GoogleLogin } from '@react-oauth/google'
import dotenv from 'dotenv'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

dotenv.config()

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))

        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const googleSuccess = async (res) => {
        const result = jwt_decode(res?.credential);

        try {
            dispatch({ type: 'AUTH', data: { result } })

            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }
    const googleError = () => {
        console.log('Google Sign In was unsuccessful.')
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
                        <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                        <GoogleLogin clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`} 
                            render={(renderProps) => (
                                <Button  onClick={renderProps.onClick} disabled={renderProps.disabled} />
                            )}
                            onSuccess={googleSuccess}
                            onError={googleError}
                            state_cookie_domain="single_host_origin"
                        />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'Dont have an account ? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth