/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { useState } from "react";

function Form() {
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selectedOptionPerson, setSelectedOptionPerson] =
    useState("persona natural");

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [relation, setRelation] = useState("");
  const [tempData, setTempData] = useState([]);

  const handleAddTempData = () => {
    const newData = { name, lastname, relation };
    setTempData([...tempData, newData]);
    setName("");
    setLastname("");
    setRelation("");
  };

  const handleRemoveTempData = (index) => {
    const updatedTempData = tempData.filter((_, i) => i !== index);
    setTempData(updatedTempData);
  };
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChangePerson = (event) => {
    console.log(event.target.value);
    setSelectedOptionPerson(event.target.value);
  };

  return (
    <div className="container">
      <div className="row h-auto">
        <div className="col align-items-center">
          <h3>LOGO</h3>
        </div>
      </div>
      <div className="card-body mb-3 text-center">
        <div className="row h-auto border">
          <div className="border p-3 bg-body-secondary">
            <h3 className="fw-bold">LÍNEA ÉTICA INDEPENDIENTE</h3>
          </div>
          <div className="border">
            <p>Formulario de Registro de Denuncia</p>
          </div>
          <div className="container p-4">
            <div className="d-flex-colunm text-start border p-2 rounded bg-info-subtle bg-opacity-25">
              <label
                className="text-success-emphasis fw-bold pb-1"
                htmlFor="name"
              >
                ¿Desea presentar una denuncia de forma anónima?
              </label>
              <div className="row justify-content-start">
                <div className="col-1">
                  <label
                    className="form-check-label"
                    style={{
                      paddingLeft: "1rem",
                      paddingRight: "0.5rem",
                    }}
                    htmlFor="anonymous"
                  >
                    Sí
                  </label>
                  <input
                    type="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="col-1">
                  <label
                    className="form-check-label"
                    htmlFor="anonymous"
                    style={{
                      paddingLeft: "1rem",
                      paddingRight: "0.5rem",
                    }}
                  >
                    No
                  </label>
                  <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleOptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="row p-3">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                Correo electrónico a donde se le notificará :
              </label>
              <div className="col-sm-8">
                <input type="email" className="form-control" id="inputEmail3" />
              </div>
            </div>

            {selectedOption === "option1" && (
              <div className="p-3 text-start text-danger">
                <li className="">
                  El uso de este correo electrónico es sólo para notificaciones
                  del sistema y el envío de su código único de seguimiento.
                </li>
                <li className="">
                  Si usted no ingresa un correo electrónico, deberá guardar en
                  un lugar seguro el código único de seguimiento que el sistema
                  genera al momento de enviar la información.
                </li>
                <li className="">
                  Sin el código único, usted no podrá hacer el seguimiento a su
                  denuncia.
                </li>
              </div>
            )}
            <div className="row p-3">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                Relación con la Entidad, donde se presentó el hecho denunciado:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione una opción</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
              </div>
            </div>
            {selectedOption === "option1" && (
              <div>
                <div className="d-flex-colunm rounded bg-info-subtle bg-opacity-25">
                  <p
                    className="p-2 text-success-emphasis fw-bold text-start"
                    htmlFor="name"
                  >
                    1. DATOS DEL DENUNCIANTE (en caso no haya seleccionado la
                    opcion de anónimo)
                  </p>
                </div>
                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    TIPO DE PERSONA:
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedOptionPerson}
                      onChange={handleOptionChangePerson}
                    >
                      <option value="persona natural" selected>
                        persona natural
                      </option>
                      <option value="persona juridica">persona juridica</option>
                    </select>
                  </div>
                </div>

                {selectedOptionPerson === "persona juridica" && (
                  <div>
                    <div className="row p-2">
                      <label
                        htmlFor="inputEmail3"
                        className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                      >
                        RUC :
                      </label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control" id="ruc" />
                      </div>
                    </div>
                    <div className="row p-2">
                      <label
                        htmlFor="inputEmail3"
                        className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                      >
                        RAZÓN SOCIAL:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    DNI :
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    APELLIDO PATERNO:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    APELLIDO MATERNO:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    NOMBRES:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <label
                    htmlFor="inputEmail3"
                    className="fw-bold fs-6 col-sm-4 col-form-label text-start"
                  >
                    TELÉFONO:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      id="inputEmail3"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="d-flex-colunm rounded bg-info-subtle bg-opacity-25">
              <p
                className="p-2 text-success-emphasis fw-bold text-start"
                htmlFor="name"
              >
                2. INFORMACIÓN DE LA DENUNCIA
              </p>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                Seleccione el tipo de infracción a denunciar:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione una opción</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                Indique la Entidad, donde ocurrieron los hechos a denunciar:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione una opción</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                Indique la unidad orgánica o proceso donde han ocurrido los
                hechos a denunciar:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione una opción</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-4 col-form-label text-start"
              >
                ¿En qué fecha ocurrió el hecho de la denuncia? (aproximado):
              </label>
              <div className="col-sm-8">
                <input type="date" className="form-control" id="inputEmail3" />
              </div>
            </div>

            <div className="d-flex-colunm rounded bg-info-subtle bg-opacity-25">
              <p
                className="p-2 text-success-emphasis text-start"
                htmlFor="name"
              >
                Identifique a las personas involucradas en la denuncia:
              </p>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-3 col-form-label text-start"
              >
                NOMBRES:
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-3 col-form-label text-start"
              >
                APELLIDOS:
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className="fw-bold fs-6 col-sm-3 col-form-label text-start"
              >
                Relacion con la entidad:
              </label>
              <div className="col-sm-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                >
                  <option selected>Seleccione una opción</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddTempData}
              className="btn btn-secondary"
            >
              Agregar +
            </button>
            <div className="responsive p-2">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>Nombres y Apellidos</th>
                    <th>Relación con la entidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tempData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name + " " + data.lastname}</td>
                      <td>{data.relation}</td>
                      <td>
                  <button className="text-danger border-0" onClick={() => handleRemoveTempData(index)}>
                    X
                  </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex-colunm rounded bg-info-subtle bg-opacity-25">
              <p
                className="p-2 text-success-emphasis text-start"
                htmlFor="name"
              >
                Detalle los hechos sucedidos que permitan analizar y evaluar la
                denuncia: :
              </p>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className=" fs-6 col-sm-12 col-form-label text-start"
              >
                Para facilitar el análisis de las denuncias, es importante
                detallar qué ocurrió, quiénes y/o qué áreas se encuentran
                involucradas, cuándo, cómo y dónde ocurrieron los hechos.
              </label>
              <div className="col-sm-12">
                <textarea className="form-control" />
              </div>
            </div>
            <div className="row p-2">
              <label
                htmlFor="inputEmail3"
                className=" fs-6 col-sm-12 col-form-label text-start"
              >
                De haber realizado anteriormente una denuncia sobre el mismo
                tema, indique el código que le fuera asignado, a fin de
                relacionarlas (opcional).
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  placeholder="digite aqui..."
                  className="form-control"
                  id="inputEmail3"
                />
              </div>
            </div>
            <div className="d-flex-colunm rounded bg-info-subtle bg-opacity-25">
              <p
                className="p-2 text-success-emphasis text-start"
                htmlFor="name"
              >
                Adjunte la evidencia sobre los hechos denunciados (opcional): :
              </p>
            </div>
            <div className="">
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="p-3 text-start text-danger">
              <li className="">
                El formato de archivo puede ser pdf, imagen, audio, video
              </li>
              <li className="">
                El tamaño máximo del archivo debe ser menor o igual a 25MB
              </li>
            </div>
            <div className="col-md-12 mb-3">
              <div className="alert alert-info hidden-sm hidden-xs text-primary text-start ">
                <input type="checkbox" value="1" />{" "}
                <span>
                  Conforme a lo establecido en la Ley N° 29733 - Ley de
                  Protección de Datos Personales y en el Decreto Supremo
                  003-2013/JUS - Reglamento de la Ley N° 29733, doy mi
                  consentimiento libre, expreso, inequívoco, previo e informado
                  para que Taboada Bormioli &amp; Asociados realice el
                  tratamiento de mis datos personales, con el único propósito de
                  llevar a cabo las gestiones necesarias para canalizar la
                  denuncia presentada a través de este canal. De ser el caso,
                  extiendo este consentimiento a la entidad donde se ha
                  originado la denuncia a fin de que sea procesada en el marco
                  de lo establecido por la normativa legal vigente. Declaro
                  tener conocimiento sobre mi derecho a revocar este
                  consentimiento en cualquier momento. La negativa al
                  tratamiento de los datos personales imposibilita la
                  utilización del servicio.
                </span>
                <br />
                <input type="checkbox" value="1" />{" "}
                <span>
                  Declaro bajo juramento, que los datos proporcionados son
                  verídicos y asumo las implicancias de acuerdo a Ley, en caso
                  la información resulte falsa y/o inexacta.
                </span>
              </div>
            </div>
            <button type="button" className="btn btn-primary float-start">
              Enviar{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;