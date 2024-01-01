import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io';

const Employees = () => {
  const user = JSON.parse(localStorage.getItem('jsuser'));

  const [employees, setEmployees] = useState(Array)

  const deleteEmployee = (id) => {
    axios.delete('http://localhost:4000/employees/' + id , {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setEmployees(res.data.employees)
      }
    });
  }

  useEffect(() => {
    axios.get('http://localhost:4000/employees', {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setEmployees(res.data.employees)
      }
    });
  }, [])

  if(employees.length <= 0) {
    return( 
    <>
    <Link to='/createuser' className='z-10  absolute right-2 top-20 bg-black text-white  rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
        <IoMdAdd />
    </Link>
    <div className='text-center text-2xl font-base mt-10 '>No Employees yet</div>
    </>
    )
   }
  return (
    <>
      <Link to='/createuser' className='z-10 absolute right-2 top-20 bg-black text-white  rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
        <IoMdAdd />
      </Link>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className='w-full text-center mt-10 mb-5 text-2xl'>Employees</h2>
        <table className="w-full sm:w-3/4 xs:w-3/4 ml-auto mr-auto text-sm text-left rtl:text-right text-white dark:text-white">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                User Type
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              {user.usertype === 1 && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Details/Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={employee._id}>
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  {employee.username}
                </th>
                <td className="px-6 py-4">
                  {employee.department}
                </td>
                <td className="px-6 py-4">
                  {employee.usertype === 0 ? 'Employee' : 'Manager'}
                </td>
                <td className="px-6 py-4">
                  {employee.location}
                </td>
                <td className="px-6 py-4">
                  <a href={`/edituser/${employee._id}`} className="font-medium text-green-600 dark:text-green-500 hover:underline">Details/Edit</a>
                </td>
                <td className="px-6 py-4">
                  <p onClick={() => {
                    deleteEmployee(`${employee._id}`)
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

export default Employees