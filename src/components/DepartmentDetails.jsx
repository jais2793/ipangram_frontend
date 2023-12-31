import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const DepartmentDetails = () => {
  const { department } = useParams();

  const [employees, setEmployees] = useState(Array)

  useEffect(() => {
    axios.get(`http://localhost:4000/departmentdetails/${department}`, {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data.status) {
        setEmployees(res.data.employees)
      }
    });
  }, [department])

  return (
    <>
      <div className='mt-10 text-2xl font-semibold text-center w-full'>{department} Department:</div>
      {employees.length <= 0 && <div className='text-center text-2xl font-base mt-10 '>No Employees yet</div>}
      {employees.length > 0 && (
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

              <th scope="col" className="px-6 py-3">
                Details
              </th>


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
                  <a href={`/edituser/${employee._id}`} className="font-medium text-green-700 dark:text-green-500 hover:underline">Details/Edit User</a>
                </td>
                
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </>

  )
}

export default DepartmentDetails