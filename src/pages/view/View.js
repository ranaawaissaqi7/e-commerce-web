import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function View() {

    const { userShipingData } = useSelector((state) => state.userCardData)

    const [userSignUpData, setUserSignUpData] = useState({})
    //getUserSignUpData

    const getUserSignUpData = async () => {
        const data = await JSON.parse(localStorage.getItem("UserSignUpData"))
        console.log("Data => ", data)

        setUserSignUpData(data)
        console.log("userData => ", userSignUpData)
    }

    const { id} = useParams()
    console.log("id => ",id)
    //useState
    const [state, setState] = useState({})
    //getProduct
    const getProduct = async () => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await res.json()
            console.log("DATA => ", data)

            setState(data)
        } catch (error) {
            console.log("ERROR => ", error)
        }
    }

    //useEffect
    useEffect(() => {
        getProduct();
        getUserSignUpData();
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6 table-responsive">
                        <table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="3" className='text-center'>item Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <th scope="row">User Name</th>
                                    <td>{userSignUpData.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">User Email</th>
                                    <td>{userSignUpData.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">User Phone No</th>
                                    <td>{userShipingData.phoneNo}</td>
                                </tr>
                                <tr>
                                    <th scope="row">User Shiping Adress</th>
                                    <td>{userShipingData.adress}</td>
                                </tr>
                                <tr>
                                    <th scope="row">ID</th>
                                    <td>{state.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Title</th>
                                    <td>{state.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Category</th>
                                    <td>{state.category}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{state.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>{state.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{lineHeight:"100px"}} >Image</th>
                                    <td><img src={state.image} alt={state.image} style={{ width: "100px", height: "100px" }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    
                    </div>
                </div>
            </div>
        </>
    )
}
