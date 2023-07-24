import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthChange:false,
    isFlage:false,
    isSignUp:false,
}
export const AuthChangeSlice=createSlice({
    name:"authChnage",
    initialState,

    reducers:{
        changeAuth:(state,action)=>{
            state.isAuthChange=action.payload;
        },
        changeFlage:(state,action)=>{
            state.isFlage=action.payload
        },
        changeSignUp:(state,action)=>{
            state.isSignUp=action.payload
        }
    }
})

export const{changeAuth,changeFlage,changeSignUp}=AuthChangeSlice.actions

export default AuthChangeSlice.reducer