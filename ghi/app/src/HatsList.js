function HatsList(props) {

  //DELETE HAT WHEN CLICKED ON "Delete" BUTTON---------------------------------------------------

  const handleDelete = async (hat, e) => {
    const hatUrl = `http://localhost:8090/api/hats/${hat.id}`
    const fetchConfig = {
      method: "delete",
    }
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      window.location.reload(false);
    }
  }

  //LISTING--------------------------------------------

  return (
    // <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-image">
            <thead>
              <tr>
                <th scope="col">Style name</th>
                <th scope="col">Image</th>
                <th scope="col">Fabric</th>
                <th scope="col">Color</th>
                <th scope="col">Location</th>
                <th scope="col">Created</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {props.hats.map(hat => {
                return (
                  <tr key={hat.id}>
                    <td scope="row">{hat.style_name}</td>
                    <td className="w-25">
                      <img src={hat.url_picture} className="img-fluid img-thumbnail" />
                    </td>
                    <td>{hat.fabric}</td>
                    <td>{hat.color}</td>
                    <td>{hat.location["closet_name"]}</td>
                    <td>{new Date(hat.created).toLocaleDateString()}</td>
                    <td><button className="btn btn-primary" onClick={e => handleDelete(hat, e)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    // </div>
  );
}

export default HatsList;
