import { Routes as Rutas, Route } from "react-router-dom";
import { Admin, Form } from "./pages";

const Routes = () => {
    return (
        <Rutas>
            <Route path="/admin" element={<Admin />} />
            <Route path="/form" element={<Form />} />
        </Rutas>
    );
}

export default Routes;