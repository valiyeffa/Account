import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import Dashboard from './components/dashboard/Dashboard'
import UserHome from './pages/UserHome'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route element={<Home/>} path='/'></Route>
      <Route element={<UserHome/>} path='/:id'></Route>
      <Route element={<LoginPage/>} path='/login'></Route>
      <Route element={<RegisterPage/>} path='/register'></Route>
      <Route element={<Dashboard />} path='/account/:id'></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App