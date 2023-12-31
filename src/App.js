import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './container/Home';
import Departments from './container/Departments';
import Employees from './container/Employees';
import { Login, Register, PrivateRoute, NotFound, DepartmentDetails, EmployeeDetails, EditUser, CreateUser } from './components'


const App = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<PrivateRoute ><Home /></PrivateRoute>} />
                <Route path='/departments' element={<PrivateRoute><Departments /></PrivateRoute>} />
                <Route path='/departmentdetails' element={<PrivateRoute><DepartmentDetails /></PrivateRoute>} />
                <Route path='/employees' element={<PrivateRoute><Employees /></PrivateRoute>} />
                <Route path='/employeedetails' element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} />
                <Route path='/createuser' element={<PrivateRoute><CreateUser /></PrivateRoute>} />
                <Route path='/edituser/:id' element={<PrivateRoute><EditUser /></PrivateRoute>} />
                <Route path='*' Component={NotFound} />
            </Routes>
        </>
    )

}

export default App