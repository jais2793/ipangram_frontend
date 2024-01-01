import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

let state = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"].sort()

const Register = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [location, setLocation] = useState('');

  const [correctRegister, setCorrectRegister] = useState(false);
  const [incorrectRegister, setIncorrectRegister] = useState(false);
  const [incorrectMsg, setIncorrectMsg] = useState('')

  const navigate = useNavigate();

  if (localStorage.getItem("jsuser")) {
    localStorage.removeItem("jsuser");
  }

  const registerUser = async () => {
    setIncorrectRegister(false)
    if (userName.length > 0 && password.length > 0 && userType.length > 0 && location.length > 0) {
      const department = 'none'
      const params = JSON.stringify({
        username: userName,
        userpass: password,
        location: location,
        usertype: userType,
        department: department
      })
      await axios.post('http://localhost:4000/register', params, {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.data.status) {
          setCorrectRegister(true)
          setTimeout(() => navigate('/login'), 3000)
        } else {
          setIncorrectMsg('User Already Exists')
          setIncorrectRegister(true)
        }
      });
    } else {
      setIncorrectMsg('Please enter all details')
      setIncorrectRegister(true)
    }

  }

  return (
    <>
      <div className='antialiase bg-white dark:bg-slate-900'>

        <div className='flex justify-center items-center w-full h-lvh'>
          <div className="flex justify-center items-center align-middle w-full max-w-xs">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className='text-center font-bold text-xl'>Register</h2>
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

              <div className="mb-4">
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
                  type="password"
                  placeholder="Password" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype">
                  User Type
                </label>
                <select
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select User Type</option>
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value='0' >
                    Employee
                  </option>
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value='1' >
                    Manager
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype">
                  Location
                </label>
                <select
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select Location</option>
                  {state.map((s) => (
                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={s} key={s} >
                      {s}
                    </option>
                  ))}

                </select>
                {incorrectRegister && (<p className="text-red-500 text-sm">{incorrectMsg}</p>)}
                {correctRegister && (<p className="text-emerald-500 text-sm">user registered successfully</p>)}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={registerUser}
                >
                  Register
                </button>
                <a className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="/login">
                  Already registered? Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register