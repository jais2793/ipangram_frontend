import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className='text-center w-full h-lvh mt-10'>
        <div className='text-2xl'>
          404: Page Not Found
        </div>
        <Link to="/" className='text-lg text-blue-600 hover:opacity-80'>Go to Home Page</Link>
    </div >
    </>
  )
}

export default NotFound