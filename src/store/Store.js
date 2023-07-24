import { configureStore } from '@reduxjs/toolkit'
import ApiDataReducer from "./features/apiData/ApiDataSlice"
import AuthChangeReducer from './features/authChange/AuthChangeSlice'
import UserCardDataReducer from './features/userCardData/UserCardDataSlice'
export const Store = configureStore({
    reducer: {
        apiData:ApiDataReducer,
        authChange:AuthChangeReducer,
        userCardData:UserCardDataReducer
    },
  })
