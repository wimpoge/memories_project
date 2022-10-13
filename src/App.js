import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import dotenv from 'dotenv'
import PostDetails from './components/PostDetails/PostDetails.jsx'

dotenv.config()

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home />} />
                        <Route path="/posts/search" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/auth" element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App