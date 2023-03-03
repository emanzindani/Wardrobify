import React, {useState, setItems} from "react";
function ShoesList(props) {
    const [items, setItems] = React.useState(props.shoes);
  const deleteItem = (id) => async () => {
    const url = `http://localhost:8080/api/shoes/${id}/`;
    const fetchConfig = {
      method: "delete",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const deleted = await response.json();
    }
    setItems((items) =>
      items.filter((item) => {
        return item.id !== id;
      })
    );
  };
    return(
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
            {items.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{shoe.model_name}</td>
                <td>{shoe.manufacturer}</td>
                <td>{shoe.color}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={deleteItem(shoe.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
            })}
        </tbody>
      </table>
    );
}
export default ShoesList;
