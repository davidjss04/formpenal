import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { API_URL } from "../../config";

const Table = () => {
  const [data, setData] = useState([]);
  const url = `${API_URL}/complaints/`;
  const urlDelete = `${API_URL}/complaints/delete/`;
  const urlDeleteFile =`${API_URL}/complaints/file/delete?fileName=`;

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data;
      setData(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleVerClick = (id) => {
    return id;
  };

  const deleteComplaint = async (id, nameFile) => {
    try {
      await axios.get(urlDelete + `?id=${id}`).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("response daa", response.data);

          alert("eliminado");
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);

          nameFile.map(async (data) => {
            // console.log(data.name_file)
            await axios
              .get(urlDeleteFile + `${data.url_file}`)
              .then((response) => {
                if (response.status === 200) {
                  console.log(response);
                }
              })
              .then(() => {});
          });
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "code",
      label: "Código de denuncia",
    },
    {
      name: "fdate",
      label: "Fecha de registro",
    },
    {
      name: "fstatus",
      label: "Estado",
    },
    {
      name: "files",
      label: "Documentos",
      options: {
        customBodyRender: (filesArray) => {
          return (
            <ul>
              {filesArray.map((file, index) => (
                <li key={index}>
                  <strong>Tipo:</strong> {file.type_file},{" "}
                  <strong>Tamaño:</strong> {file.size_file},{" "}
                  <strong>Nombre:</strong> {file.name_file},{" "}
                  <a
                    target="__blank"
                    href={`` + file.url_file}
                  >
                    Ver
                  </a>
                </li>
              ))}
            </ul>
          );
        },
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value, tableMetaData) => {
          const response = handleVerClick(tableMetaData.rowData[0]);
          const responseFile = handleVerClick(tableMetaData.rowData[4]);
          return (
            <div className="d-flex gap-2">
              <a href={"/admin/details/" + response} target="__blank">
                <button type="button" className="btn btn-outline-primary">
                  Ver
                </button>
              </a>
              <a
                onClick={() => deleteComplaint(response, responseFile)}
                target="__blank"
              >
                <button type="button" className="btn btn-outline-danger">
                  Eliminar
                </button>
              </a>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox", // Puedes ajustar esto según tus necesidades
    responsive: "standard", // O 'vertical', dependiendo de tus preferencias
    selectableRows: "none", // Deshabilita la selección de filas
    download: false, // Deshabilita las opciones de descarga
    print: false, // Deshabilita las opciones de impresión
    viewColumns: false, // Oculta el menú de selección de columnas
    search: true, // Muestra el campo de búsqueda
    searchOpen: true, // Mantén el campo de búsqueda siempre visible
    rowsPerPageOptions: [], // Deshabilita las opciones de cambio de número de filas por página
    customToolbar: () => null, // No muestra ninguna herramienta personalizada
  };

  return (
    <div className="container-xxl">
      {data.length > 0 ? (
        <MUIDataTable
          title="Denuncias"
          data={data}
          columns={columns}
          options={options}
        />
      ) : (
        <span>NO HAY DATOS PARA MOSTRAR LOADER</span>
      )}
    </div>
  );
};

export default Table;
