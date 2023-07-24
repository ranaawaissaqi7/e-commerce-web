import React, { useEffect, useState } from 'react'
import "./UserProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { removeUserCardData } from '../../store/features/userCardData/UserCardDataSlice';
import { Link } from 'react-router-dom';

export default function UserProfile() {

    //useDispatch
    const dispatch=useDispatch()

    const { userShipingData,userCardData } = useSelector((state) => state.userCardData)

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

    return (
        <>
            <div className="container-fluid">
                <div className="row  ">
                    <div className="col-md-12">
                        <div className="row ">
                            <div className="col-md-12 table-responsive">
                                {
                                    userCardData.length  ? <>
                                     <h3 className='text-center'>Your items</h3>
                                <table className="table table-responsive table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col" className='text-center'>#</th>
                                            <th scope="col" className='text-center'>Title</th>
                                            <th scope="col" className='text-center'>Price</th>
                                            <th scope="col" className='text-center'>Category</th>
                                            <th scope="col" className='text-center'>Image</th>
                                            <th scope="col" className='text-center'>User Name</th>
                                            <th scope="col" className='text-center'> Email</th>
                                            <th scope="col" className='text-center'> Phone No</th>
                                            <th scope="col" className='text-center'> Shiping Adress</th>
                                            <th scope="col" colSpan={2} className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            userCardData.map((items,index)=>{
                                                return  <tr>
                                                <th scope="row" key={index+1}>{index+1}</th>
                                                <td>{items.title}</td>
                                                <td>{items.price}</td>
                                                <td>{items.category}</td>
                                                <td><img className='api-image' src={items.image} alt={items.image} /></td>
                                                <td>{userSignUpData.fullName}</td>
                                                <td>{userSignUpData.email}</td>
                                                <td>{userShipingData.phoneNo}</td>
                                                <td>{userShipingData.adress}</td>
                                                <td> <Link className='btn btn-info'  to={`/view/${items.id}`}  >  View</Link> </td>
                                                <td> <button className='btn btn-danger' onClick={()=>dispatch(removeUserCardData(index))}>Delete</button> </td>
                                            </tr> 
                                            })
                                        }

                                    </tbody>
                                </table>

                                    </> : <>
                                    <h2 className='text-center text-danger' > Items is Empity  </h2>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
