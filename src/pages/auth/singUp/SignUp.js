import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { changeSignUp } from '../../../store/features/authChange/AuthChangeSlice'
import { useDispatch } from 'react-redux'
export default function SignUp() {

  //useDispatch
  const dispatch=useDispatch()

  //useNavigate
  const navigate=useNavigate("")

    const [userState, setUserState] = useState({
        fullName: "",
        email: "",
        password: "",
        cpassword: ""
      })

  //onChangeHandler
  const onChangeHandler = e => {
    setUserState({ ...userState, [e.target.name]: e.target.value })
  }

  //errorsState
  const [errorsState, setErrorsState] = useState({})

  //formValidation
    const formValidation = () => {
        const { fullName, email, password, cpassword } = userState
        let isValid = true
        const newErrors = {}
        if (!fullName.trim()) {
          newErrors.fullName = "Name is Required !"
          isValid = false
        }
        if (!email.trim()) {
          newErrors.email = "Email is Required !"
          isValid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Email is invalid";
          isValid = false;
        }
        if (!password.trim()) {
          newErrors.password = "Password is Required !"
          isValid = false
        } else if (password.length < 6) {
          newErrors.password = "Password should be at least 6 characters long";
          isValid = false;
        }
        if (!cpassword.trim()) {
          newErrors.cpassword = " Conform Password is Required !"
          isValid = false
        } else if (password !== cpassword) {
          newErrors.cpassword = "Password is Not Match"
          isValid = false
        }
        
        setErrorsState(newErrors)
        return isValid
      }
  //onSubmitHandler
  const onSubmitHandler=(e)=>{
    const { fullName, email} = userState
    e.preventDefault();

    if (formValidation()) {
        userState.fullName=fullName.trim().toLowerCase()
        userState.email=email.trim()
        localStorage.setItem("UserSignUpData",JSON.stringify(userState))
        dispatch(changeSignUp(true))
        navigate("/login")
    }
  }
  return (
    <>
          <div className="container-fluid ">
        <div className="row vh-100 bg-info align-items-center justify-content-center">
          <div className="col-md-4">
            <h2 className=' text-center text-light'>Sign Up</h2>

            <div className="row">
              <form>
                <div className="col-12">
                  <input type="text" name='fullName' className="form-control" placeholder="Enter Full Name " aria-label="Enter Full Name" onChange={onChangeHandler} />
                </div>
                {errorsState.fullName && <span className="text-danger">{errorsState.fullName}</span>}
            
                <div className="col-12 mt-2">
                  <input type="email" name='email' className="form-control" placeholder="Enter Email" aria-label="Enter Email" onChange={onChangeHandler} />
                </div>
                {errorsState.email && <span className="text-danger">{errorsState.email}</span>}
                <div className="col-12 mt-2">
                  <input type="password" name='password' className="form-control" placeholder="Enter  Password" aria-label="Enter Password" onChange={onChangeHandler} />
                </div>
                {errorsState.password && <span className="text-danger">{errorsState.password}</span>}
                <div className="col-12 mt-2">
                  <input type="password" name='cpassword' className="form-control" placeholder="Enter Confrom Password" aria-label="Enter Confrom Password" onChange={onChangeHandler} />
                </div>
                {errorsState.cpassword && <span className="text-danger">{errorsState.cpassword}</span>}
                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <button className='btn btn-outline-success' onClick={onSubmitHandler}>SignUp</button>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <Link className='btn btn-outline-dark' to={"/login"} >Login</Link>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <Link className='btn btn-outline-danger' to={"/"} >Home</Link>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
