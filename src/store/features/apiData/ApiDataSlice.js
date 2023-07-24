import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    apiData:[],
    isLoading:false
}
export const ApiDataSlice=createSlice({
    name:"apiData",
    initialState,

    extraReducers:(builder)=>{
        builder 
               .addCase(fetchApiData.pending,(state,action)=>{
                state.isLoading=false
               })
               .addCase(fetchApiData.fulfilled,(state,action)=>{
                state.isLoading=true
                state.apiData=action.payload
               })
               .addCase(fetchApiData.rejected,(state,action)=>{
                state.isLoading=false
               })
    }
})

export const fetchApiData=createAsyncThunk("apiData/fetch",async()=>{
    const res= await fetch('https://fakestoreapi.com/products')
    const data=await res.json()
    return data;
})
export const {} = ApiDataSlice.actions
export default ApiDataSlice.reducer