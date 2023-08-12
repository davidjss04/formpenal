import Table from "./Table"
import Cookies from "universal-cookie";

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
      <header className="bg-info mb-4"><h1>ADMIN HEADER</h1> <button className="btn btn-danger" onClick={()=>exit()}>salir</button></header>
    <Table />
    </div>
  )
}
export default Admin