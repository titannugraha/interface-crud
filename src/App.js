import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.css";
import Sidebar from "./Components/Sidebar";
import { logout } from "./Actions/userActions";
import Swal from "sweetalert2";
import Product from "./Pages/Product";

const App = () => {
  const [loading, setLoading] = useState(false);
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      dispatch({ type: "LOGIN_SUCCESS", payload: true });
    } else {
      dispatch(logout());
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <div></div>
      ) : loginStatus ? (
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-body">
            <Routes>
              <Route exact path="/products" element={<Product />} />
              {/* <Route exact path="/users" element= /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
