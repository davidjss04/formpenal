import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const Table = () => {
  const [products, setProducts] = useState([]);
  const url = "https://fakestoreapi.com/products";

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data;
      console.log(data);
      setProducts(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "title",
      label: "TITLE",
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const id = products[dataIndex].id;
          const nombre = products[dataIndex].title;

          return (
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item" type="button">Action</button></li>
              <li><button class="dropdown-item" type="button">Another action</button></li>
              <li><button class="dropdown-item" type="button">Something else here</button></li>
            </ul>
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
      {products.length > 0 ? (
        <MUIDataTable
          title="Denuncias"
          data={products}
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
