import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate('/')
        setUser(null)
    }

    

    useEffect(() => {
        const token = user?.credential

        if (token) {
            const decodedToken = jwtDecode(token)

            if (decodedToken.exp * 1000 < new Date().getItem()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>
                        Memories
                    </Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.picture} src={user.result.picture}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>   
    )
}

export default Navbar