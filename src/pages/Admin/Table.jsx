import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:3000/complaints/";

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
    return id
    // Aquí puedes realizar acciones adicionales al hacer clic en "Ver"
  };

  const columns = [
    {
      name: "id",
      label: "id",
    },
    {
      name: "anonymous",
      label: "anonymous",
      options: {
        customBodyRender: (value) => (
          value ? "Yes" : "No"
        ),
    }
  },
    {
      name: "businessName",
      label: "businessName",
    },
    // {
    //   name: "dDni",
    //   label: "dDni",
    // },
    // {
    //   name: "dFatherLastname",
    //   label: "dFatherLastname",
    // },
    // {
    //   name: "dMotherLastname",
    //   label: "dMotherLastname",
    // },
    // {
    //   name: "dNames",
    //   label: "dNames",
    // },
    // {
    //   name: "dPhone",
    //   label: "dPhone",
    // },
    // {
    //   name: "dTypePerson",
    //   label: "dTypePerson",
    // },
    // {
    //   name: "date",
    //   label: "date",
    // },
    // {
    //   name: "detail",
    //   label: "detail",
    // },
    // {
    //   name: "email",
    //   label: "email",
    // },
    // {
    //   name: "entity",
    //   label: "entity",
    // },
    // {
    //   name: "fdate",
    //   label: "fdate",
    // },
    {
      name: "files",
      label: "files",
      options: {
        customBodyRender: (filesArray) => {
          return (
            <ul>
            {filesArray.map((file, index) => (
              <li key={index}>
                Tipo: {file.type_file}, Tamaño: {file.size_file}, Nombre: {file.name_file}, <a target="__blank" href={"http://localhost:3000/complaints/"+file.url_file}>Ver</a>
              </li>
            ))}
          </ul>
          );
              },
      },
    },
    // {
    //   name: "fstatus",
    //   label: "fstatus",
    // },
    // {
    //   name: "lastCode",
    //   label: "lastCode",
    // },
    // {
    //   name: "organicUnit",
    //   label: "organicUnit",
    // },
    {
      name: "peopleInvolved",
      label: "People Involved",
      options: {
        customBodyRender: (peopleArray) => {
          return (
            <ul>
              {peopleArray.map((person, index) => (
                <li key={index}>{person}</li>
              ))}
            </ul>
          );
        },
      },
    },
    // {
    //   name: "relationEntity",
    //   label: "relationEntity",
    // },
    // {
    //   name: "ruc",
    //   label: "ruc",
    // },
    // {
    //   name: "typeInfringement",
    //   label: "typeInfringement",
    // },
    {
      name: "as",
      label: "as",
      options: {
        customBodyRender: (value, tableMetaData) => {

const response = handleVerClick(tableMetaData.rowData[0]);
          return (
            <div class="">
         <a href={"/admin/details/"+response} target="__blank"><button type="button" class="btn btn-outline-primary">Ver Completo</button></a>
          </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none", // Desactiva la selección de filas
    customToolbarSelect: () => null, // Oculta el botón de selección en la toolbar
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
