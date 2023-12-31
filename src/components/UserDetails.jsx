import React from 'react'

const UserDetails = ({ User }) => {

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className='w-full text-center mt-10 mb-5 text-2xl'>Your Details</h2>
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
              {User.usertype === 1 && (
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                {User.username}
              </th>
              <td className="px-6 py-4">
                {User.department}
              </td>
              <td className="px-6 py-4">
                {User.usertype === 0 ? 'Employee' : 'Manager'}
              </td>
              <td className="px-6 py-4">
                {User.location ? User.location : 'none selected'}
              </td>
              {User.usertype === 1 && (
                <td className="px-6 py-4">
                  <a href={`/edituser/${User.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserDetails