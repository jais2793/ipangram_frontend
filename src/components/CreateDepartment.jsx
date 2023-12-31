import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


const CreateDepartment = () => {

  const navigate = useNavigate();

  const [incorrectRegister, setIncorrectRegister] = useState(false);
  const [incorrectMsg, setIncorrectMsg] = useState('')

  const [department, setDepartment] = useState('');

  const [updateMsg, setUpdateMsg] = useState('')

  const addDepartment = () => {
    setIncorrectRegister(false)
    if (department.length > 0) {
      const params = JSON.stringify({
        name: department,
      })
      axios.post(`http://localhost:4000/departments`, params, {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.data.status) {
          setUpdateMsg(res.data.message)
          setTimeout(() => { navigate('/departments') }, 4000)
        } else {
          setIncorrectRegister(false)
          setIncorrectMsg(res.data.message)
        }
      });
    } else {
      setIncorrectMsg('Please fill all fields')
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
        <h3 className='mt-10 text-2xl text-bold text-center'>Add Department</h3>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Department Name</label>
          <input
            type="text"
            id="username"
            className="bg-gray-200 border-gray-600  text-black text-base  text-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="User Name"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addDepartment}
          >
            Add Department
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateDepartment;