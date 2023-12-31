import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './container/Home';
import Departments from './container/Departments';
import Employees from './container/Employees';
import { Login, Register, PrivateRoute, NotFound, DepartmentDetails, EditUser, CreateUser, CreateDepartment, EditDepartment } from './components'


const App = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<PrivateRoute ><Home /></PrivateRoute>} />
                <Route path='/departments' element={<PrivateRoute><Departments /></PrivateRoute>} />
                <Route path='/createdepartment' element={<PrivateRoute><CreateDepartment /></PrivateRoute>} />
                <Route path='/departmentdetails/:department' element={<PrivateRoute><DepartmentDetails /></PrivateRoute>} />
                <Route path='/editdepartment/:id' element={<PrivateRoute><EditDepartment /></PrivateRoute>} />
                <Route path='/employees' element={<PrivateRoute><Employees /></PrivateRoute>} />
                <Route path='/createuser' element={<PrivateRoute><CreateUser /></PrivateRoute>} />
                <Route path='/edituser/:id' element={<PrivateRoute><EditUser /></PrivateRoute>} />
                <Route path='*' Component={NotFound} />
            </Routes>
        </>
    )

}

export default App