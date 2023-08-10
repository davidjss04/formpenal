import { useState } from "react";
import { useFormik } from "formik";
import { CustomInput, AlertLabel } from "../../components";
import { date } from "yup";

function Form() {
  const formik = useFormik({
    initialValues: {
      id: "",
      anonymous: "false", // "true" or "false
      ruc: "",
      businessName: "",
      email: "",
      relationEntity: "",
      dTypePerson: "",
      dDni: "",
      dFatherLastname: "",
      dMotherLastname: "",
      dNames: "",
      dPhone: "",
      typeInfringement: "",
      entity: "",
      organicUnit: "",
      date: "",
      peopleInvolved: [],
      detail: "",
      lastCode: "",
      file: [],
      fdate: "",
      fstatus: "",
      files: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    handleChange: (e) => {
      console.log(e.target.value);
    },
  });

  const options = {
    relationEntity: [
      { value: "Cliente / Usuario", label: "Cliente / Usuario" },
      { value: "Otro", label: "Otro" },
      { value: "Proveedor", label: "Proveedor" },
      { value: "Trabajador", label: "Trabajador" },
    ],

    dTypePerson: [
      {
        value: "Persona Natural",
        label: "Persona Natural",
      },
      {
        value: "Persona Juridica",
        label: "Persona Juridica",
      },
    ],

    typeInfringement: [
      { value: "1", label: "Opción 1" },
      { value: "2", label: "Opción 2" },
    ],

    entity: [
      { value: "1", label: "Opción 1" },
      { value: "2", label: "Opción 2" },
    ],

    organicUnit: [
      { value: "1", label: "Opción 1" },
      { value: "2", label: "Opción 2" },
    ],

    iRelation: [
      { value: "1", label: "Opción 1" },
      { value: "2", label: "Opción 2" },
    ],
  }

  const [peopleInvolved, setPeopleInvolved] = useState({}) // [{id: "", name: "", lastname: "", relation: ""}

  const [tempData, setTempData] = useState([]);

  const handleAddTempData = () => {
    const newData = { ...peopleInvolved };
    setTempData([...tempData, newData]);
    formik.values.peopleInvolved.push(newData);
    setPeopleInvolved({});
  };

  const handleRemoveTempData = (index) => {
    const updatedTempData = tempData.filter((_, i) => i !== index);
    formik.values.peopleInvolved = formik.values.peopleInvolved.filter((_, i) => i !== index);
    setTempData(updatedTempData);
  };

  const [fileList, setFileList] = useState([]);


  const handleFileChange = (e) => {
    setFileList([...fileList, ...e.target.files]);

    const data = new FormData();
    data.append(`file-${e.target.files.length}`, e.target.files[0], e.target.files[0].name);
    formik.values.files.push(data);
    for(const value of formik.values.files.values()){
      console.log("desde el formik", value);
    }
    console.log(fileList);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    fileList.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    for (const value of data.values()) {
      console.log("desde la data", value);
    }

    /*     // 👇 Uploading the files using the fetch API to the server
        fetch('https://httpbin.org/post', {
          method: 'POST',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err)); */
  };

  const handleRemoveFile = (index) => {
    const updatedFileList = fileList.filter((_, i) => i !== index);
    formik.values.files = formik.values.files.filter((_, i) => i !== index);
    setFileList(updatedFileList);
    for(const value of formik.values.files.values()){
      console.log("desde el formik", value);
    }
  }

  const files = fileList ? [...fileList] : [];

  return (
    <div className="container">
      <div className="row h-auto">
        <div className="col align-items-center">
          <h3>LOGO</h3>
        </div>
      </div>
      <form className="card-body mb-3 text-center" onSubmit={formik.handleSubmit}>
        <div className="row h-auto border">
          <div className="border p-3 bg-body-secondary">
            <h3 className="fw-bold">LÍNEA ÉTICA INDEPENDIENTE</h3>
          </div>
          <div className="border">
            <p>Formulario de Registro de Denuncia</p>
          </div>
          <div className="container p-4">
            <AlertLabel
              type="radio"
              label="¿Desea presentar una denuncia de forma anónima?"
              value={formik.values.anonymous}
              id="anonymous"
              name="anonymous"
              onChange={formik.handleChange}
            />
            <CustomInput
              id="email"
              value={formik.values.email}
              name="email"
              label="Correo electrónico a donde se le notificará :"
              type="email"
              placeholder="example@mail.com"
              onChange={formik.handleChange}
            />

            {formik.values.anonymous === "true" && (
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
            <CustomInput
              id="relationEntity"
              name="relationEntity"
              label="Relación con la Entidad, donde se presentó el hecho denunciado:"
              type="select"
              placeholder="digite aqui..."
              value={formik.values.relationEntity}
              onChange={formik.handleChange}
              options={options.relationEntity}
            />
            {formik.values.anonymous === "false" && (
              <>
                <AlertLabel
                  label="1. DATOS DEL DENUNCIANTE (en caso no haya seleccionado la opcion de anónimo)"
                />
                <CustomInput
                  id="dTypePerson"
                  name="dTypePerson"
                  label="TIPO DE PERSONA:"
                  type="select"
                  placeholder="digite aqui..."
                  value={formik.values.dTypePerson}
                  onChange={formik.handleChange}
                  options={options.dTypePerson}
                />
                {formik.values.dTypePerson === "Persona Juridica" && (
                  <>
                    <CustomInput
                      id="ruc"
                      name="ruc"
                      label="RUC :"
                      type="text"
                      placeholder="digite aqui..."
                      value={formik.values.ruc}
                      onChange={formik.handleChange}
                    />
                    <CustomInput
                      id="businessName"
                      name="businessName"
                      label="RAZÓN SOCIAL:"
                      type="text"
                      placeholder="digite aqui..."
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                    />
                  </>
                )}

                <CustomInput
                  id="dDni"
                  name="dDni"
                  label="DNI :"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dDni}
                  onChange={formik.handleChange}
                />
                <CustomInput
                  id="dFatherLastname"
                  name="dFatherLastname"
                  label="APELLIDO PATERNO:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dFatherLastname}
                  onChange={formik.handleChange}
                />
                <CustomInput
                  id="dMotherLastname"
                  name="dMotherLastname"
                  label="APELLIDO MATERNO:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dMotherLastname}
                  onChange={formik.handleChange}
                />
                <CustomInput
                  id="dNames"
                  name="dNames"
                  label="NOMBRES:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dNames}
                  onChange={formik.handleChange}
                />
                <CustomInput
                  id="dPhone"
                  name="dPhone"
                  label="TELÉFONO:"
                  type="phone"
                  placeholder=""
                  value={formik.values.dPhone}
                  onChange={formik.handleChange}
                />
              </>
            )}
            <AlertLabel
              label="2. INFORMACIÓN DE LA DENUNCIA"
            />
            <CustomInput
              id="typeInfringement"
              name="typeInfringement"
              label="Seleccione el tipo de infracción a denunciar:"
              type="select"
              placeholder="digite aqui..."
              value={formik.values.typeInfringement}
              onChange={formik.handleChange}
              options={options.typeInfringement}
            />
            <CustomInput
              id="entity"
              name="entity"
              label="Indique la Entidad, donde ocurrieron los hechos a denunciar:"
              type="select"
              placeholder="digite aqui..."
              value={formik.values.entity}
              onChange={formik.handleChange}
              options={options.entity}
            />
            <CustomInput
              id="organicUnit"
              name="organicUnit"
              label="Indique la unidad orgánica o proceso donde han ocurrido los hechos a denunciar:"
              type="select"
              placeholder="digite aqui..."
              value={formik.values.organicUnit}
              onChange={formik.handleChange}
              options={options.organicUnit}
            />
            <CustomInput
              id="date"
              name="date"
              label="¿En qué fecha ocurrió el hecho de la denuncia? (aproximado):"
              type="date"
              placeholder="digite aqui..."
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <AlertLabel
              label="3. PERSONAS INVOLUCRADAS"
            />
            <CustomInput
              id="iNames"
              name="iNames"
              label="NOMBRES:"
              type="text"
              placeholder="digite aqui..."
              value={peopleInvolved.iNames}
              onChange={(e) => setPeopleInvolved({ ...peopleInvolved, iNames: e.target.value })}
            />
            <CustomInput
              id="iLastname"
              name="iLastname"
              label="APELLIDOS:"
              type="text"
              placeholder="digite aqui..."
              value={peopleInvolved.iLastname}
              onChange={(e) => setPeopleInvolved({ ...peopleInvolved, iLastname: e.target.value })}
            />
            <CustomInput
              id="iRelation"
              name="iRelation"
              label="RELACIÓN CON LA ENTIDAD:"
              type="select"
              placeholder="digite aqui..."
              options={options.iRelation}
              value={peopleInvolved.iRelation}
              onChange={(e) => setPeopleInvolved({ ...peopleInvolved, iRelation: e.target.value })}
            />
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
                      <td>{data.iNames + " " + data.iLastname}</td>
                      <td>{data.iRelation}</td>
                      <td>
                        <button type="button" className="text-danger border-0" onClick={() => handleRemoveTempData(index)}>
                          X
                        </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AlertLabel
              label="4. Detalle los hechos sucedidos que permitan analizar y evaluar la denuncia :"
            />
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
            <AlertLabel
              label="5. Adjunte la evidencia sobre los hechos denunciados (opcional) :"
            />
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
            <div className="mb-3">
              <ul>
                {files && files.map((file, i) => (
                  <li key={i}>
                    {file.name} - {file.type}
                  </li>
                ))}
              </ul>

              <button onClick={handleUploadClick}>Upload</button>
            </div>
            <div className="p-3 text-start text-danger">
              <li className="">
                El formato de archivo puede ser pdf, imagen, audio, video
              </li>
              <li className="">
                El tamaño máximo del archivo debe ser menor o igual a 25MB
              </li>
            </div>
            <div className="responsive p-2">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>Titulo</th>
                    <th>Enlace</th>
                    <th>Ver</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {files && files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{file.type}</td>
                      <td>
                        <a href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">Ver</a>
                      </td>
                      <td>
                        <button type="button" className="text-danger border-0" onClick={() => handleRemoveFile(index)}>
                          X
                        </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <button type="button" className="btn btn-primary float-start" onClick={formik.handleSubmit}>
              Enviar{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;