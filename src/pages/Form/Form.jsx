import { useState } from "react";
import { useFormik } from "formik";
import { CustomInput, AlertLabel } from "../../components";
import * as Yup from 'yup';
import { options } from "../../data";
import { API_URL } from "../../config";
import axios from 'axios';

function Form() {

  const [required, setRequired] = useState(null);

  const formik = useFormik({
    initialValues: {
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
      fdate: "",
      files: [],
      fstatus: "",
    },
    validationSchema: Yup.object().shape({
      anonymous: Yup.string().required("Campo requerido para la denuncia"),
      email: Yup.string().email("Correo electrónico inválido").required("Campo requerido para la denuncia"),
      relationEntity: Yup.string().required("Campo requerido para la denuncia"),
      dTypePerson: Yup.string().required("Campo requerido para la denuncia"),
      dDni: Yup.number().required("Campo requerido para la denuncia"),
      dMotherLastname: Yup.string().required("Campo requerido para la denuncia"),
      dFatherLastname: Yup.string().required("Campo requerido para la denuncia"),
      dNames: Yup.string().required("Campo requerido para la denuncia"),
      dPhone: Yup.number().required("Campo requerido para la denuncia"),
      ruc: required ? Yup.string().required("Campo requerido para la denuncia") : Yup.string(),
      businessName: required ? Yup.string().required("Campo requerido para la denuncia") : Yup.string(),
      typeInfringement: Yup.string().required("Campo requerido para la denuncia"),
      entity: Yup.string().required("Campo requerido para la denuncia"),
      organicUnit: Yup.string().required("Campo requerido para la denuncia"),
      date: Yup.string().required("Campo requerido para la denuncia"),
      detail: Yup.string().required("Campo requerido para la denuncia"),
      lastCode: Yup.string().required("Campo requerido para la denuncia"),
    }),
    onSubmit: (values) => {
      if (!fileList) {
        return;
      }

      console.log("files", fileList);

      const data = new FormData();
      fileList.forEach((file) => {
        data.append('file', file);
      });

      try {
        axios.post(`${API_URL}/complaints/file`, data).then((response) => {
          if (response.status === 201) {
            console.log("response daa", response.data);
            if (response.data.length > 0) {
              values.files = response.data
              console.log("values", JSON.stringify(values));
            }
            axios.post(`${API_URL}/complaints`, values).then((response) => {
              if (response.status === 201) {
                console.log(response);
              }
            });
            return
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  formik.handleChange = (e) => {
    if (e.target.name === "dTypePerson") {
      if (e.target.value === "Juridica") {
        setRequired(true);
      }

      if (e.target.value === "Natural") {
        setRequired(false);
      }
    }

    console.log(e.target.name, e.target.value);
    formik.setFieldValue(e.target.name, e.target.value);
  };


  const [peopleInvolved, setPeopleInvolved] = useState({}) // [{id: "", name: "", lastname: "", relation: ""}
  const [tempData, setTempData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const files = fileList ? [...fileList] : [];

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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      e.target.files[0].size > 25000000 && alert("El tamaño máximo del archivo debe ser menor o igual a 25MB");
    }

    setFileList([...fileList, ...e.target.files]);

    console.log(fileList);
  };

  const handleRemoveFile = (index) => {
    const updatedFileList = fileList.filter((_, i) => i !== index);
    setFileList(updatedFileList);
  }

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
              error={formik.errors.email}
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
              error={formik.errors.relationEntity}
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
                  error={formik.errors.dTypePerson}
                />
                {formik.values.dTypePerson === "Juridica" && (
                  <>
                    <CustomInput
                      id="ruc"
                      name="ruc"
                      label="RUC :"
                      type="string"
                      placeholder="digite aqui..."
                      value={formik.values.ruc}
                      onChange={formik.handleChange}
                      error={formik.errors.ruc}
                    />
                    <CustomInput
                      id="businessName"
                      name="businessName"
                      label="RAZÓN SOCIAL:"
                      type="string"
                      placeholder="digite aqui..."
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                      error={formik.errors.businessName}
                    />
                  </>
                )}

                <CustomInput
                  id="dDni"
                  name="dDni"
                  label="DNI :"
                  type="number"
                  placeholder="digite aqui..."
                  value={formik.values.dDni}
                  onChange={formik.handleChange}
                  error={formik.errors.dDni}
                />
                <CustomInput
                  id="dFatherLastname"
                  name="dFatherLastname"
                  label="APELLIDO PATERNO:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dFatherLastname}
                  onChange={formik.handleChange}
                  error={formik.errors.dFatherLastname}
                />
                <CustomInput
                  id="dMotherLastname"
                  name="dMotherLastname"
                  label="APELLIDO MATERNO:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dMotherLastname}
                  onChange={formik.handleChange}
                  error={formik.errors.dMotherLastname}
                />
                <CustomInput
                  id="dNames"
                  name="dNames"
                  label="NOMBRES:"
                  type="text"
                  placeholder="digite aqui..."
                  value={formik.values.dNames}
                  onChange={formik.handleChange}
                  error={formik.errors.dNames}
                />
                <CustomInput
                  id="dPhone"
                  name="dPhone"
                  label="TELÉFONO:"
                  type="number"
                  placeholder="digite aqui..."
                  value={formik.values.dPhone}
                  onChange={formik.handleChange}
                  error={formik.errors.dPhone}
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
                <textarea className="form-control"
                  id="detail"
                  name="detail"
                  value={formik.values.detail}
                  onChange={formik.handleChange}
                  placeholder="digite aqui..."
                />
              </div>
              {
                formik.errors.detail && <div className="text-danger">{formik.errors.detail}</div>
              }
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
                  className="form-control"
                  id="lastCode"
                  name="lastCode"
                  value={formik.values.lastCode}
                  onChange={formik.handleChange}
                  placeholder="digite aqui..."
                />
              </div>
              {
                formik.errors.lastCode && <div className="text-danger">{formik.errors.lastCode}</div>
              }
            </div>
            <AlertLabel
              label="5. Adjunte la evidencia sobre los hechos denunciados (opcional) :"
            />
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange}
              accept="application/pdf, image/*, audio/*, video/*"
            />
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
            <div className="d-grid gap-2 col-2 mx-auto">
              <button type="button" className="btn btn-primary btn-lg" onClick={formik.handleSubmit}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;