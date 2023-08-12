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
      <header className="bg-info mb-4 d-flex px-3 justify-content-between"><h3>PANEL DE ADMINSITRADOR</h3> <button className="r" onClick={()=>exit()}>salir</button></header>
    <Table />
    </div>
  )
}
export default Admin