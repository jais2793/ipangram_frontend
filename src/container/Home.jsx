import React from 'react'
import {EmployeeDetails} from '../components'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  return (
    <>
        <EmployeeDetails User={user}/>  
    </>

  )
}

export default Home