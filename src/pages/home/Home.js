import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchApiData } from '../../store/features/apiData/ApiDataSlice';
import { addUserCardData,addUserShipingData } from '../../store/features/userCardData/UserCardDataSlice';
import { changeFlage } from '../../store/features/authChange/AuthChangeSlice';
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {

  //useSelector ApiData
  const { apiData, isLoading } = useSelector((state) => state.apiData)
  console.log("Api Data => ", apiData)

  const {isAuthChange,isFlage} = useSelector((state) => state.authChange)
  console.log("isAuthChange => ", isAuthChange)

  // userCradData redux state
  const { userCardData } = useSelector((state) => state.userCardData)

  //useDispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchApiData());
  }, [])

  //errorState
  const [errorState, setErrorState] = useState(true)

  //clickErrorHandler
  const clickErrorHandler=()=>{
    setErrorState(false)
  }

  //userShiping adress state
  const [shipingAdressState, setShipingAdressState] = useState({
    phoneNo:"",
    adress:""
  })


  //onShipingChangeHandler
  const onShipingChangeHandler=(e)=>{
    setShipingAdressState({...shipingAdressState,[e.target.name]:e.target.value})
  }

  //shiping error state
  const [shipingErrorState, setShipingErrorState] = useState({})

  //formValidation
  const formValidation=()=>{
    const{phoneNo,adress}=shipingAdressState

    let isValid=true

    const newError={}

    if (!phoneNo.trim()) {
      newError.phoneNo=" Phone Number is Reqiured "
      isValid=false
    } else if (phoneNo.length!==11) {
      newError.phoneNo="Please Enter Correct 11 digit Phone No. "
      isValid=false
    }
    
    if (!adress.trim()) {
      newError.adress=" Adress is Reqiured "
      isValid=false
    }
    setShipingErrorState(newError)
    return isValid
  }
   
  const shipingAdressSubmitHandler=(e)=>{
    const{phoneNo,adress}=shipingAdressState

    e.preventDefault();
    if (formValidation()) {
      shipingAdressState.phoneNo=phoneNo.trim()
      shipingAdressState.adress=adress.trim().toLowerCase()
      
      console.log("shiping => ",shipingAdressState)

      dispatch(addUserShipingData(shipingAdressState))
      dispatch(changeFlage(true))
    }
  }
  const addCardHandler = (items) => {
    if (isFlage===true) {
      let cardData = {}

      cardData = items
  
      dispatch(addUserCardData([...userCardData, cardData])) 
    }
  }

  console.log("user data redux ", userCardData)
  return (
    <>
      <h1 className=' text-center'>Home Page</h1>

      {
        isLoading ? <>
          <h2 className='text-center'>Add to Card</h2>

          <div className="container-fluid">
            <div className="row d-flex justify-content-around">

              {
                apiData.map((items, index) => {
                  return <>

                    <div className="card mt-2" style={{ width: "18rem" }}>
                      <img src={items.image} className="card-img-top" alt="..." style={{ width: "5rem", marginLeft: "80px" }} />
                      <div className="card-body">
                        <h5 className="card-title">{items.category}</h5>
                        <h6 className="card-text">{items.title}</h6>
                        <p className="card-text"> Price :{items.price}</p>
                      </div>
                      {
                        isAuthChange ? <> {isFlage ? <> <button className='btn btn-success' onClick={() => { addCardHandler(items) }}>Add Card</button> </> : <button type="button" className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Card
                      </button> } </>  : <>
                      <button className='btn btn-primary' onClick={clickErrorHandler}>Add Card</button>
                      {errorState ? <></> : <Link className='text-danger text-center' to={"/login"}>Please Login Here</Link> }
                      </>
                      }
                     
                      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Shiping Adress</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <label for="phone-number" className="col-form-label">Phone Number:</label>
                              <input type="number" name='phoneNo' className="form-control" id="phone-number" placeholder='03000000000' onChange={onShipingChangeHandler} />
                              {shipingErrorState.phoneNo && <span className="text-danger">{shipingErrorState.phoneNo}</span>} <br />
                              <label for="adress-lin1" className="col-form-label">Shiping Adress:</label>
                              <textarea className="form-control" name='adress' id="adress-lin1" placeholder='Shiping Adress' onChange={onShipingChangeHandler} ></textarea>
                              {shipingErrorState.adress && <span className="text-danger">{shipingErrorState.adress}</span>}
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={shipingAdressSubmitHandler}>Save changes</button>     
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </>
                })
              }
            </div>
          </div>

        </> :
          <>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-4">
                  <h4 className=' text-danger text-center'>loading please Waite...</h4>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}
