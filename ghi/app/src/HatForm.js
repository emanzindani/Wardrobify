import React, { useEffect, useState } from 'react';

function HatForm (props) {

    //CHANGE INPUTS WITH USER'S ENTRIES------------------------------------------------------
    // Set the useState hook to store "fabric" in the component's state,
    // with a default initial value of an empty string.
    const [fabric, setFabric] = useState('');
    const [style, setSyle] = useState('');
    const [color, setColor] = useState('');
    const [picture, setPicture] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // Create the handleFabricChange method to take what the user inputs
    // into the form and store it in the state's "fabric" variable.
    const handleFabricChange = (event) => {
        const value = event.target.value;
        return setFabric(value);
    }
    const handleStyleChange = (event) => {
        const value = event.target.value;
        return setSyle(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        return setColor(value);
    }
    const handlePictureChange = (event) => {
        const value = event.target.value;
        return setPicture(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        return setSelectedLocation(value);
    }

    //GETS LIST OF LOCATIONS INSIDE THE DATA VARIABLE---------------------------------------------

    const [locations, setLocations] = useState([]);

    const fetchData = async () => {

        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //ADD LIST OF LOCATIONS FOR THE SELECT BUTTON-----------------------------------------
            setLocations(data.locations)
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

        data.fabric = fabric;
        data.style_name = style;
        data.color = color;
        data.url_picture = picture;
        data.location = selectedLocation;

        console.log(data);

        //Sends data to the server:
        const hatUrl = `http://localhost:8090${selectedLocation}hats/`;

        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(hatUrl, fetchConfig);

        if (response.ok) {
            const newHat = await response.json();

            setFabric('');
            setSyle('');
            setColor('');
            setPicture('');
            setSelectedLocation('');
        }
    }

    //RETURNS THE FORM FOR A NEW HAT--------------------------------------------------------
    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new hat</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input value={fabric} onChange={handleFabricChange} placeholder="Enter a fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={style} onChange={handleStyleChange} placeholder="Starts" required type="text" name="style" id="style" className="form-control"/>
                            <label htmlFor="style">Style</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={picture} onChange={handlePictureChange} placeholder="Picture url" required type="url" name="picture" id="picture" className="form-control" rows="3"/>
                            <label htmlFor="picture">Picture</label>
                        </div>
                        <div className="mb-3">
                            <select value={selectedLocation} onChange={handleLocationChange} placeholder="Select a closet" required name="location" id="location" className="form-select">
                                <option value="">Selecto a closet</option>
                                {locations.map(location => {
                                    return (
                                    <option key={location.href} value={location.href}>
                                        {location.closet_name}
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

export default HatForm;
