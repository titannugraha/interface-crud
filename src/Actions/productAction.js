import axios from "axios";
import Swal from "sweetalert2";

const apiDomain = process.env.REACT_APP_API_DOMAIN || "http://localhost:8000";
const URL = apiDomain + "/api/products";

// Action Types
export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_ERROR = "EDIT_PRODUCT_ERROR";


// Action Creators
export const editProductSuccess = () => ({
  type: EDIT_PRODUCT_SUCCESS,
});

export const editProductError = (errorMessage) => ({
  type: EDIT_PRODUCT_ERROR,
  payload: errorMessage,
});

export const setProducts = (data) => ({
  type: SET_PRODUCTS,
  payload: data,
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS,
});

export const addProductError = (errorMessage) => ({
  type: ADD_PRODUCT_ERROR,
  payload: errorMessage,
});

export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductError = (errorMessage) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: errorMessage,
});

export const getProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: product,
});

export const getProductError = (errorMessage) => ({
  type: GET_PRODUCT_ERROR,
  payload: errorMessage,
});

// Thunk Action to Add Product
export const addProduct = (data) => async (dispatch) => {
  try {
    let result = await axios.post(URL + "/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        user_token: localStorage.getItem("user_token"),
      },
    });
    dispatch(addProductSuccess());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload(false);
  } catch (error) {
    console.log(error);
    dispatch(
      addProductError(
        error.response?.data?.message ||
          "An error occurred while adding the product."
      )
    );
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while adding the product.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

// Thunk Action to Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axios.delete(URL + `/delete/${id}`, {
        headers: { user_token: localStorage.getItem("user_token") },
      });

      dispatch(deleteProductSuccess());

      Swal.fire(
        "Deleted!",
        `Your result with id ${id} has been deleted.`,
        "success"
      );

      window.location.reload(false);
    }
  } catch (err) {
    console.log(err);
    dispatch(
      deleteProductError(
        err.response?.data?.message ||
          "An error occurred while deleting the product."
      )
    );
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        err.response?.data?.message ||
        "An error occurred while deleting the product.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

// Thunk Action to Get Product by ID
export const getProductById = (id) => async (dispatch) => {
  try {
    let result = await axios.get(URL + `/${id}`);
    dispatch(getProductSuccess(result.data));
  } catch (err) {
    console.log(err);
    dispatch(
      deleteProductError(
        err.response?.data?.message ||
          "An error occurred while get the product."
      )
    );
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        err.response?.data?.message ||
        "An error occurred while get the product.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const editProduct = (id, data) => async (dispatch) => {
  try {
    let result = await axios.put(URL + `/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        user_token: localStorage.getItem("user_token"),
      },
    });
    dispatch(editProductSuccess());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload(false);
  } catch (error) {
    console.log(error);
    dispatch(
      editProductError(
        error.response?.data?.message ||
          "An error occurred while editing the product."
      )
    );
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while editing the product.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

