import React, { useEffect, useState } from 'react';

function ShoeForm (props) {

    //CHANGE INPUTS WITH USER'S ENTRIES------------------------------------------------------
    // Set the useState hook to store "modelName" in the component's state,
    // with a default initial value of an empty string.
    const [modelName, setModel] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [color, setColor] = useState('');
    const [selectedBin, setSelectedBin] = useState('');

    // Create the handleModelChange method to take what the user inputs
    // into the form and store it in the state's "modelName" variable.
    const handleModelChange = (event) => {
        const value = event.target.value;
        return setModel(value);
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        return setManufacturer(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        return setColor(value);
    }
    const handleBinChange = (event) => {
        const value = event.target.value;
        return setSelectedBin(value);
    }

    //GETS LIST OF LOCATIONS INSIDE THE DATA VARIABLE---------------------------------------------

    const [bins, setBins] = useState([]);

    const fetchData = async () => {

        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //ADD LIST OF BINS FOR THE SELECT BUTTON-----------------------------------------
            setBins(data.bins)
        }
    }

    // useEffect() is a hook to make fectch requests to get data:
    useEffect(() => {
        fetchData();
    }, []);

    //SAVE FORM WHEN CLICKED ON "Ceate" BUTTON---------------------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty JSON object
        const data = {};

        data.model_name = modelName;
        data.manufacturer = manufacturer;
        data.color = color;
        data.bin = selectedBin;

        console.log(data);

        //Sends data to the server:
        const shoeUrl = `http://localhost:8080${selectedBin}shoes/`;

        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoeUrl, fetchConfig);

        if (response.ok) {
            const newShoe = await response.json();

            setModel('');
            setManufacturer('');
            setColor('');
            setSelectedBin('');
        }
    }

    //RETURNS THE FORM FOR A NEW HAT--------------------------------------------------------
    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input value={modelName} onChange={handleModelChange} placeholder="Model name" required type="text" name="model" id="model" className="form-control"/>
                            <label htmlFor="fabric">Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={manufacturer} onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                            <label htmlFor="style">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select value={selectedBin} onChange={handleBinChange} placeholder="Select a closet" required name="location" id="location" className="form-select">
                                <option value="">Select a bin</option>
                                {bins.map(bin => {
                                    return (
                                    <option key={bin.href} value={bin.href}>
                                        {bin.bin_number}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                            <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default ShoeForm;
