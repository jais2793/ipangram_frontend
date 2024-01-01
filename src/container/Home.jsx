import React from 'react'
import {UserDetails} from '../components'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('jsuser'))
  return (
    <>
        <UserDetails User={user}/>  
    </>

  )
}

export default Home