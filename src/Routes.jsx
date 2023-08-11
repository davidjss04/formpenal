import { Routes as Rutas, Route } from "react-router-dom";
import { Admin, Form } from "./pages";
import Login from "./pages/Login/Login";

const Routes = () => {
    return (
        <Rutas>
            <Route path="/" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/form" element={<Form />} />
        </Rutas>
    );
}

export default Routes;