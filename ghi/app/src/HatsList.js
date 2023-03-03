function HatsList(props) {

  //DELETE HAT WHEN CLICKED ON "Delete" BUTTON---------------------------------------------------

  const handleDelete = async (hat,e) => {
    const hatUrl = `http://localhost:8090/api/hats/${hat.id}`
    const fetchConfig = {
      method: "delete",}
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
    window.location.reload(false);
    }
  }

  //LISTING--------------------------------------------

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Style name</th>
          <th>Fabric</th>
          <th>Color</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.hats.map(hat => {
          return (
            <tr key={hat.id}>
              <td>{hat.style_name}</td>
              <td>{hat.fabric}</td>
              <td>{hat.color}</td>
              <td>{hat.location["closet_name"]}</td>
              <td><button className="btn btn-primary" onClick={e => handleDelete(hat,e)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HatsList;
