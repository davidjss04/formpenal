import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function valSession() {
  !cookies.get("user") && (window.location.href = "/login");
}

const Details = () => {
  valSession();

  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [fstatus, setFstatus] = useState("");

  const { id } = useParams();
  const url = `http://localhost:3000/complaints/details?id=${id}`;
  const urlUpdate = `http://localhost:3000/complaints/update`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFstatus(response.data.fstatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    setFstatus(event.target.value);
  };

  const handleSaveClick = async () => {
    const postData = {
      id: id,
      fstatus: fstatus,
    };

    const response = await axios
      .post(urlUpdate, postData)
      .then((response) => {
        setEditing(false);
        return response.data;
      })
      .catch((error) => {
        return { response: "error de conexion" };
      });

    console.log(response);
  };

  return (
    <div className="container pb-4 pt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Detalle de la denuncia 00001
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>anonymous</th>
            <td>{data.anonymous ? "Sí" : "No"}</td>
          </tr>
          <tr>
            <th>businessName</th>
            <td>{data.businessName}</td>
          </tr>
          <tr>
            <th>dFatherLastname</th>
            <td>{data.dFatherLastname}</td>
          </tr>
          <tr>
            <th>dMotherLastname</th>
            <td>{data.dMotherLastname}</td>
          </tr>
          <tr>
            <th>dNames</th>
            <td>{data.dNames}</td>
          </tr>
          <tr>
            <th>dPhone</th>
            <td>{data.dPhone}</td>
          </tr>
          <tr>
            <th>dTypePerson</th>
            <td>{data.dTypePerson}</td>
          </tr>
          <tr>
            <th>date</th>
            <td>{data.date}</td>
          </tr>
          <tr>
            <th>detail</th>
            <td>{data.detail}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{data.email}</td>
          </tr>
          <tr>
            <th>entity</th>
            <td>{data.entity}</td>
          </tr>
          <tr>
            <th>fdate</th>
            <td>{data.fdate}</td>
          </tr>
          <tr>
            <th className="align-middle">files</th>
            <td>
              <ul>
                {data.files &&
                  data.files.map((element, index) => (
                    <li key={index}>
                      <strong>Tipo:</strong> {element.type_file},{" "}
                      <strong>Tamaño:</strong> {element.size_file},{" "}
                      <strong>Nombre:</strong> {element.name_file},{" "}
                      <a
                        target="__blank"
                        href={
                          "http://localhost:3000/complaints/" + element.url_file
                        }
                      >
                        Ver
                      </a>
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>fdate</th>
            <td>{data.fdate}</td>
          </tr>
          <tr>
            <th>fstatus</th>
            <td>
              <div className="d-flex gap-2">
                <select
                  class="form-select"
                  aria-label="Disabled select example"
                  value={fstatus}
                  onChange={handleInputChange}
                  disabled={!editing}
                >
                  <option value="ESTADO 1">ESTADO 1</option>
                  <option value="ESTADO 2">ESTADO 2</option>
                  <option value="ESTADO 3">ESTADO 3</option>
                </select>

           
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>lastCode</th>
            <td>{data.lastCode}</td>
          </tr>
          <tr>
            <th>organicUnit</th>
            <td>{data.organicUnit}</td>
          </tr>
          <tr>
            <th className="align-middle">peopleInvolved</th>
            <td>
              <ul>
                {data.peopleInvolved &&
                  data.peopleInvolved.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>relationEntity</th>
            <td>{data.relationEntity}</td>
          </tr>
          <tr>
            <th>ruc</th>
            <td>{data.ruc}</td>
          </tr>
          <tr>
            <th>typeInfringement</th>
            <td>{data.typeInfringement}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Details;
