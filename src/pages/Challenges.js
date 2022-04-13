import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Challenges() {
  const {isAuthenticated, loginWithRedirect} = useAuth0()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isAuthenticated){
        loginWithRedirect()
    }
  },[])
  return (
    <>
        <Navbar/>
        Challenges
        <Footer/>
    </>
  )
}

export default Challenges