import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from '../pages/auth/singUp/SignUp'
import Login from '../pages/auth/login/Login'
import FrontendRouting from '../pages/frontendRouting/FrontendRouting'
export default function Routing() {
  return (
   <>
   <BrowserRouter>
   
   <Routes>
    <Route path='/*' element={<FrontendRouting/>} />
    <Route path='/signUp' element={<SignUp/>} />
    <Route path='/login' element={<Login/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}
