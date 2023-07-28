// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/userReducer";
import productReducer from "../Reducer/productReducer";

const rootReducer = {
  user: userReducer,
  product: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
