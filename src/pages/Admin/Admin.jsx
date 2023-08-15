import Table from "./Table"
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function valSession() {
  !cookies.get("user") && (window.location.href = "/login");
}
function exit() {
  cookies.remove("user");
  window.location.href = "/login";

}
const Admin = () => {
  valSession();

  return (
    <div className="pb-4">
      <nav className="navbar navbar-light" style={
        {
          backgroundColor: "#e3f2fd",
        }
      }>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">HOME</Link>
          <h2
            className="d-flex justify-content-center"
          >
            <h2>--------------- PANEL ADMINISTRATIVO ---------------</h2>
          </h2>
          <form className="d-flex">
            <button className="btn btn-outline-success" type="submit" onClick={() => exit()}>
              SALIR
            </button>
          </form>
        </div>
      </nav>

      <Table />
    </div >
  )
}
export default Admin