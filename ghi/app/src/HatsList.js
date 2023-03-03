function HatsList(props) {
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Style name</th>
            <th>Fabric</th>
            <th>Color</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
            {props.hats.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{ hat.style_name }</td>
                <td>{ hat.fabric }</td>
                <td>{ hat.color }</td>
                <td>{ hat.location["closet_name"] }</td>
              </tr>
            );
            })}
        </tbody>
      </table>
    );
}

export default HatsList;
