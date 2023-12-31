import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [department, setDepartment] = useState('');

  const [updateMsg, setUpdateMsg] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:4000/departments/${id}`, {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setDepartment(res.data.department[0].name);
      } else {
        navigate('/')
      }
    });
  }, [id, navigate]);

  const updateDepartment = () => {
    const params = JSON.stringify({
      name: department 
    })
    axios.put(`http://localhost:4000/departments/${id}`,params, {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setUpdateMsg(res.data.message)
      }
    });
  };

  if(department === undefined) {
    return (
      <>
      <div className='text-center w-full h-lvh mt-10'>
        <div className='text-2xl'>
          404: Department not found
        </div>
        <Link to="/" className='text-lg text-blue-600 hover:opacity-80'>Go to Home Page</Link>
    </div >
    </>

    )
  }
  return (
    <>
      {updateMsg.length > 0 && (
      <div className='absolute top-20 w-full text-center'>
        <h3 className=" font-semibold items-center text-center text-green-700 text-lg">{updateMsg}</h3>
      </div>  
        
      )}
      <div className="max-w-sm mx-auto">
        <h3 className='mt-10 text-2xl text-bold text-center'>Edit Department</h3>
        <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Department Name</label>
          <input
            type="text"
            id="name"
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
            onClick={updateDepartment}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditDepartment;