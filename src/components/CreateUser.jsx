import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

let state = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];

const CreateUser = () => {

  const navigate = useNavigate();

  const [incorrectRegister, setIncorrectRegister] = useState(false);
  const [incorrectMsg, setIncorrectMsg] = useState('')

  const [employee, setEmployee] = useState({
    username: '',
    userpass: '',
    usertype: '',
    department: '',
    location: '',
  });

  const [updateMsg, setUpdateMsg] = useState('')

  const createUser = () => {
    setIncorrectRegister(false)
    if (employee.username.length > 0 && employee.username.length > 0 && employee.usertype.length > 0 && employee.department.length > 0 && employee.location.length > 0) {
      const params = JSON.stringify({
        username: employee.username,
        userpass: employee.username,
        usertype: employee.usertype,
        department: employee.department,
        location: employee.location
      })
      axios.post(`http://localhost:4000/register`, params, {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.data.status) {
          setUpdateMsg(res.data.message)
          setTimeout(() => { navigate('/employees') }, 4000)
        } else {
          setIncorrectRegister(false)
          setIncorrectMsg(res.data.message)
        }
      });
    } else {
      setIncorrectRegister(true)
    }
  };


  return (
    <>
    {incorrectRegister && (
        <div className='absolute top-20 w-full text-center'>
          <h3 className=" font-semibold items-center text-center text-red-700 text-lg">{incorrectMsg}</h3>
        </div>

      )}
      {updateMsg.length > 0 && (
        <div className='absolute top-20 w-full text-center'>
          <h3 className=" font-semibold items-center text-center text-green-700 text-lg">{updateMsg}</h3>
        </div>

      )}
      <div className="max-w-sm mx-auto">
        <h3 className='mt-10 text-2xl text-bold text-center'>Add User</h3>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User Name</label>
          <input
            type="text"
            id="username"
            className="bg-gray-200 border-gray-600  text-black text-base  text-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="User Name"
            value={employee?.username}
            onChange={(e) => setEmployee({ ...employee, username: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
          <input
            type="text"
            id="password"
            className="bg-gray-200 border  text-black text-base text-semibold  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={employee?.userpass}
            onChange={(e) => setEmployee({ ...employee, userpass: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="department" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Department</label>
          <input
            type="text"
            id="department"
            className="bg-gray-200 border  text-black text-base text-semibold  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={employee?.department}
            onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="usertype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User Type</label>
          <select
            value={employee?.usertype}
            onChange={(e) => setEmployee({ ...employee, usertype: e.target.value })}
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
        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium  text-gray-900 dark:text-gray-900">Location</label>
          <select
            value={employee?.location}
            onChange={(e) => setEmployee({ ...employee, location: e.target.value })}
            className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="others" className="sm:text-bg bg-white">Select Location</option>
            {state.map((s) => (
              <option className="text-base border-0 outline-none capitalize bg-white text-black " value={s} key={s} >
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-start mb-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={createUser}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;