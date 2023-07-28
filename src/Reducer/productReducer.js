import {
  SET_PRODUCTS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from "../Actions/productAction";

const initialState = {
  productState: [],
  productDetail: [],
  page: 0,
  pages: 0,
  rows: 0,
  addProductError: null,
  deleteProductError: null,
  getProductError: null,
  editProductError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productState: action.payload.products,
        page: action.payload.page,
        pages: action.payload.totalPage,
        rows: action.payload.totalRows,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addProductError: null,
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        addProductError: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductError: null,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteProductError: action.payload,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        getProductError: action.payload,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        editProductError: null,
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        editProductError: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
