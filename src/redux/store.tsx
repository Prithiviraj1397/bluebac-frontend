import BasicReducer from "./basicReducer"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { Middleware, combineReducers } from "redux" // Import Middleware type
import UserReducer from "./userReducer"

const rootReducer = combineReducers({
  basicReducer:BasicReducer,
  userReducer:UserReducer
})

const middleware: Middleware[] = [thunk] // Define an array of middleware

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware, // Pass the middleware array
})

export default store
