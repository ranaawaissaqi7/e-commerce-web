import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { changeAuth } from '../../../store/features/authChange/AuthChangeSlice'
export default function Login() {

  const {isAuthChange,isSignUp}=useSelector((state)=>state.authChange)
  console.log("isAuthChange => ",isAuthChange)

  //useDispatch
  const dispatch=useDispatch()

  //useNavigate
  const navigate=useNavigate("")

    const [userSignUpData, setUserSignUpData] = useState({})
    //getUserSignUpData
  
    const getUserSignUpData=async()=>{
      const data=await JSON.parse(localStorage.getItem("UserSignUpData"))
      console.log("Data => ",data)
  
      setUserSignUpData(data)
      console.log("userData => ",userSignUpData)
    }
  
    //useEffect Hook
    useEffect(()=>{
      getUserSignUpData();
    },[])

        //userLogin state
        const [userloginData, setUserLoginData] = useState({
            email:"",
            password:"",
          })
          
      
           //onChangeHandler
        const onChangeHandler=(e)=>{
          setUserLoginData({...userloginData,[e.target.name]:e.target.value})
        }
      
          //errorsState
          const [errorsState, setErrorsState] = useState({})
      
          //formValidation
          const formValidation = () => {
            const {email, password } = userloginData
            let isValid = true
            const newErrors = {}
            if (!email) {
              newErrors.email = "Email is Required !"
              isValid = false
            } else if (!/\S+@\S+\.\S+/.test(email)) {
              newErrors.email = " Invalid Email ! ";
              isValid = false;
            }
            if (!password.trim()) {
              newErrors.password = "Password is Required !"
              isValid = false
            } else if (password.length < 6) {
              newErrors.password = "Password should be at least 6 characters long";
              isValid = false;
            }      
            if (userSignUpData.email===email) {
              if (userSignUpData.password!==password) {
                newErrors.password="InValid Password "
                isValid=false
              }
            }
            if (userSignUpData.email!==email) {
              newErrors.noFoundUser=" User is Not Found Please Register Here ! "
              isValid=false
            }
            
      
            setErrorsState(newErrors)
            return isValid
          }
      
      
        //onSubmitHandler
        const onSubmitHandler=(e)=>{
          
          e.preventDefault();
          if (formValidation()) {

            dispatch(changeAuth(true))
           navigate("/")
              
          }
        }

  return (
   <>
         <div className="container-fluid ">
        <div className="row vh-100 bg-dark align-items-center justify-content-center">
          <div className="col-md-4">
            <h2 className=' text-center text-light'>Login</h2>

            <div className="row">
              <form>
              {isSignUp ? <> </> : <> <Link className='text-danger' to={"/signUp"}>Please Register Here</Link> </>}
              {errorsState.noFoundUser && <span className="text-danger">{errorsState.noFoundUser}</span>}
                <div className="col-12 mt-2">
                  <input type="email" name='email' className="form-control" placeholder="Enter Email" aria-label="Enter Email" onChange={onChangeHandler} />
                </div>
                {errorsState.email && <span className="text-danger">{errorsState.email}</span>}
                <div className="col-12 mt-2">
                  <input type="password" name='password' className="form-control" placeholder="Enter  Password" aria-label="Enter Password" onChange={onChangeHandler} />
                </div>
                {errorsState.password && <span className="text-danger">{errorsState.password}</span>}
                
                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <button className='btn btn-outline-success' onClick={onSubmitHandler}>Login</button>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <Link className='btn btn-outline-warning' to={"/signUp"} >Register</Link>
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
