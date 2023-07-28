import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Actions/userActions";
import "./style.css";
import Swal from "sweetalert2";
const Login = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(form));
  };
  const navigation = useNavigate();
  useEffect(() => {
    if (loginStatus) {
      
      navigation("/");
    }
  }, [loginStatus, navigation]);

  return (
    <>
      <div>
        <div className="row main-login">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="cards border-0 shadow rounded-3">
              <div className="card-body p-4 p-sm-5">
                <form onSubmit={submitHandler}>
                  <h5 className="card-title text-center fw-bold mb-5 fw-light fs-5">
                    Sign In
                  </h5>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      type="username"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      for="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
