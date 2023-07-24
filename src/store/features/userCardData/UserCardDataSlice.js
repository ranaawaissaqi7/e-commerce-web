import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userCardData:[],
    userShipingData:{},
}
export const UserCardDataSlice=createSlice({
name:"userCardData",
initialState,

reducers:{
    addUserShipingData:(state,action)=>{
        state.userShipingData=action.payload
    },
    addUserCardData:(state,action)=>{
        state.userCardData=action.payload
    },
    removeUserCardData:(state,action)=>{
        console.log("items.id => ",action.payload)
        let newData=state.userCardData.filter((items,index)=>{
            return index!==action.payload
        })
        state.userCardData=newData
    },
   
}

})

export const {addUserCardData,addUserShipingData,removeUserCardData,addIndex} =UserCardDataSlice.actions

export default UserCardDataSlice.reducer 