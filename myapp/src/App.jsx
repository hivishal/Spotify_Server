import {BrowserRouter as Router, Routes,Route}from 'react-router-dom'
import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

export default function App(){
    return(
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}> </Route>
            <Route path='/Dashboard' element = {<Dashboard/>}></Route>


        </Routes>
    </Router>
    )
}