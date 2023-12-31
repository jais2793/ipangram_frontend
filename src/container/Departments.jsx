import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io';

const Departments = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [departments, setDepartments] = useState(Array)

  const deleteDepartment = (id) => {
    axios.delete('http://localhost:4000/departments/' + id , {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setDepartments(res.data.departments)
      }
    });
  }

  useEffect(() => {
    axios.get('http://localhost:4000/departments', {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setDepartments(res.data.departments)
      }
    });
  }, [])

  if(departments.length <= 0) {
   return( 
    <>
    <Link to='/createdepartment' className='absolute right-2 top-20 bg-black text-white  rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
        <IoMdAdd />
    </Link>
    <div className='text-center text-2xl font-base mt-10 '>No Department yet</div>
    </>
   )
  }
  return (
    <>
      <Link to='/createdepartment' className='absolute right-2 top-20 bg-black text-white  rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
        <IoMdAdd />
      </Link>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className='w-full text-center mt-10 mb-5 text-2xl'>Departments</h2>
        <table className="w-full sm:w-3/4 xs:w-3/4 ml-auto mr-auto text-sm text-left rtl:text-right text-white dark:text-white">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {user.usertype === 1 && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {departments?.map((department) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={department._id}>
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  {department.name}
                </td>
                <td className="px-6 py-4">
                  <a href={`/departmentdetails/${department.name}`} className="font-medium text-green-700 dark:text-green-500 hover:underline">Details</a>
                </td>
                <td className="px-6 py-4">
                  <a href={`/editdepartment/${department._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4">
                  <p onClick={() => {
                    deleteDepartment(`${department._id}`)
                  }
                  } className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Delete</p>
                </td>
              </tr>
            ))}

          </tbody>
          
        </table>
      </div>
    </>
  )
}

export default Departments