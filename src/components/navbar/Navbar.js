import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { changeAuth, changeFlage } from '../../store/features/authChange/AuthChangeSlice';
export default function Navbar() {

    //user card Data state redux
    const { userCardData } = useSelector((state) => state.userCardData)

    //useDispatch
    const dispatch = useDispatch()

    const isAuthChange = useSelector((state) => state.authChange.isAuthChange)

    const [userSignUpData, setUserSignUpData] = useState({})
    //getUserSignUpData

    const getUserSignUpData = async () => {
        const data = await JSON.parse(localStorage.getItem("UserSignUpData"))
        console.log("Data => ", data)

        setUserSignUpData(data)
        console.log("userData => ", userSignUpData)
    }

    //useEffect Hook
    useEffect(() => {
        getUserSignUpData();
    }, [])

    //useNavigate
    const navigate=useNavigate("")

    //logoutHandler
    const logoutHandler = () => {
        dispatch(changeAuth(false))
        dispatch(changeFlage(false))
        navigate("/")    
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto me-5 mb-2 mb-lg-0">
                            {
                                isAuthChange ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/userProfile"}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link active" aria-current="page" onClick={logoutHandler} >Logout</button>
                                    </li>

                                </> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/signUp"}>SignUp</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/login"}>Login</Link>
                                    </li>
                                </>
                            }

                        </ul>
                        {
                            isAuthChange ? <>

                                <div className="dropdown me-md-5">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userSignUpData.fullName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><Link className="dropdown-item" type="button" to={"/userProfile"} >Profile</Link></li>
                                        <li><button className="dropdown-item" type="button" onClick={logoutHandler}>Logout</button></li>
                                    </ul>
                                </div>

                                <Link type="button" className="btn btn-primary mt-2 mt-md-0" to={"/userProfile"} >
                                    Add items <span className="badge text-bg-secondary">{userCardData.length}</span>
                                </Link>
                            </> : <>
                                <Link className='btn btn-outline-danger' to={"/login"} >Login</Link>

                            </>
                        }


                    </div>
                </div>
            </nav>


        </>
    )
}
