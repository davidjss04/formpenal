import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Cookies from "universal-cookie";

const apiUrl = "http://localhost:3000/users/login";
const cookies = new Cookies();
async function session(us, pwd) {

  const data = {
    user: us,
    password: pwd,
  };
  const data_req = await axios
    .post(apiUrl, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("error en: " + err);
      return {response: "error de conexion"};
    });

    console.log("object: "+data_req)
  switch (data_req.response) {
    case "user not found":
      document.getElementById("error").innerHTML = "el usuario no existe"
      break;
    case "password not found":
      document.getElementById("error").innerHTML = "contraseña incorrecta"
      break;
    case "error de conexion":
      document.getElementById("error").innerHTML = "error de conexión"
      break;

    default:
        document.getElementById("error").innerHTML = "activar loader"
        cookies.set("user", data_req.user);
        window.location.href = "/admin"
  }
}

function valSession() {
  cookies.get("user") && (window.location.href = "/admin");
}

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  valSession();

  return (
    <div className="section">
      <div className="content d-flex vh-100">
        <div className="left w-100 h-100 position-relative d-md-block d-none">
          <div className="cir position-absolute">LOG IN</div>
          <div className="capa w-100 h-100 position-absolute"></div>
          <h1 className="title text-center position-absolute top-50 start-50">
            ADMINSITRACIÓN DE DENUNCIAS
          </h1>
          <img alt="" className="w-100 h-100" />
        </div>
        <div className="right w-100 w-md-50 position-relative">
          <form
            action=""
            className="w-50 position-absolute top-50 start-50 form-login"
          >
            <div className="form-group mb-4">
              <label>user</label>
              <input
                type="Text"
                name="username"
                className="form-control"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control pass"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
            <span className="text-danger mb-4" id="error"></span>
            </div>
            <div className="form-group d-flex justify-content-around">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  session(user, password);
                }}
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
