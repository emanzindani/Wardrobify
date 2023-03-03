function ShoesList(props) {
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
                {props.shoes.map(shoe => {
                return (
                    <tr key={shoe.id}>
                        <td>{ shoe.model_name }</td>
                        <td>{ shoe.manufacturer }</td>
                        <td>{ shoe.color }</td>
                    </tr>

                );
                })}
            </tbody>
        </table>
    );
}

export default ShoesList;
