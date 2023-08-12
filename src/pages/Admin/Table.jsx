import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:3000/complaints/";
  const urlDelete = "http://localhost:3000/complaints/delete/";

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
  };

  const deleteComplaint = async (id)=>{
    await axios.get(urlDelete+`?id=${id}`).then((response) => {
      // const data = response.data;
      alert("eliminado")
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);

    });
  }

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
      name: "",
      label: "",
      options: {
        customBodyRender: (value, tableMetaData) => {

const response = handleVerClick(tableMetaData.rowData[0]);
          return (
            <div class="d-flex gap-2">
         <a href={"/admin/details/"+response} target="__blank"><button type="button" class="btn btn-outline-primary">Ver</button></a>
         <a onClick={()=>deleteComplaint(response)} target="__blank"><button type="button" class="btn btn-outline-danger">Eliminar</button></a>
          </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox', // Puedes ajustar esto según tus necesidades
    responsive: 'standard', // O 'vertical', dependiendo de tus preferencias
    selectableRows: 'none', // Deshabilita la selección de filas
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
