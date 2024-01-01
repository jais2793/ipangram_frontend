import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectSignup, setIncorrectSignup] = useState(false);

  const navigate = useNavigate();

  if (localStorage.getItem("jsuser")) {
    localStorage.removeItem("jsuser")
  }

  const loginUser = async () => {
    setIncorrectSignup(false)
    if (userName.length > 0 && password.length > 0) {
      const params = JSON.stringify({
        username: userName,
        userpass: password
      })
      await axios.post('http://localhost:4000/login', params, {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.data.status) {
          localStorage.setItem('jsuser', JSON.stringify({ id: res.data.user._id, username: res.data.user.username,department: res.data.user.department, usertype: res.data.user.usertype, location: res.data.user.location }))
          navigate('/')
        } else {
          setIncorrectSignup(true)
        }
      });
    }
    setIncorrectSignup(true)
  }


  return (
    <>
      <div className='antialiase bg-white dark:bg-slate-900'>
        <div className='flex justify-center items-center w-full h-lvh'>
          <div className="flex justify-center items-center align-middle w-full max-w-xs">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className='text-center font-bold text-xl'>Login</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }
                  }
                  type="text"
                  placeholder="Username" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border focus:border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={
                    (e) => {
                      setPassword(e.target.value)
                    }
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      loginUser()
                    }
                  }}
                  type="password"
                  placeholder="Password" />
                {incorrectSignup && (<p className="text-red-500 text-xs italic">Incorrect UserName or Password</p>)}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={loginUser}
                >
                  Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                  Not Registered? Sign-Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login