import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../home/Home'
import Navbar from '../../components/navbar/Navbar'
import UserProfile from '../userProfile/UserProfile'
import View from '../view/View'
import Footer from '../../components/footer/Footer'
export default function FrontendRouting() {
  return (
    <>
    <Navbar/>
    <main>
    <Routes>
        <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='/userProfile' element={<UserProfile/>} />
            <Route path='/view/:id' element={<View/>} />
        </Route>
    </Routes>
    </main>
    <Footer/>
    </>
  )
}
