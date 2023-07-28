// reducers/userReducer.js

const initialState = {
  loginStatus: false,
  userToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginStatus: true,
        userToken: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loginStatus: false,
        userToken: null,
      };
    case "LOGOUT":
      return {
        ...state,
        loginStatus: false,
        userToken: null,
      };
    default:
      return state;
  }
};

export default userReducer;
