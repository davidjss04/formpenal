import { Routes as Rutas, Route } from "react-router-dom";
import { Admin, Form } from "./pages";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";

const Routes = () => {
    return (
        <Rutas>
            <Route path="/" element={<Form />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/details/:id" element={< Details/>} />
            <Route path="/login" element={<Login />} />
        </Rutas>
    );
}

export default Routes;