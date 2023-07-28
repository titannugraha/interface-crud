import axios from "axios";
import Swal from "sweetalert2";

const apiDomain = process.env.REACT_APP_API_DOMAIN || "http://localhost:8000";
const URL = apiDomain + "/api/users";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

const loginSuccess = (userToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userToken,
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

const userLogin = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios.post(URL + "/login", data);
      const userToken = result.data.user_token;
      localStorage.setItem("user_token", userToken);
      dispatch(loginSuccess(userToken));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Yes !, Succesfully to Login`,
        text: `welcome back ${data.username}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(loginFailure(errorMessage));
    }
  };
};

export { userLogin, logout };
