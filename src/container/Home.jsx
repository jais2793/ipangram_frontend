import React from 'react'
import {UserDetails} from '../components'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <>
        <UserDetails User={user}/>  
    </>

  )
}

export default Home