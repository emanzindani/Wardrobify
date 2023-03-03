# Wardrobify

Team:

* Eman Zindani - shoes
* Alix de Pannemaecker - hats

## Design

## Shoes microservice

Set up bin endpoints in insomnia
1. Back End:
    created models for shoe as well as a "bin" value object from the Wardrobe service
    created views and registered them in urls.py file:
        views includes: GET and POST method to list shoes and GET, DELETE AND put method to show shoe details
    Included shoes in insomnia and made sure all methods were working
2. Front End:
    Made changes to App.js file to include routes for both hats and shoes with partner
    Created a shoe list which displays all details and added a delete button
    Created a shoe form with a bin dropdown and a create button

## Hats microservice

- made sure all containers were talking to eacher so had to add proper links under "depends on" in the Docker compose file

- Back End:
    - Created 2 models:
        - one to get the "Location" value object from the Wardrobe service, one for the current "hats" microservice. - Have a foreignKey to the location value object for the Hat model.
    - created views:
        - encoders for both list of hats and details of one hat.
        - Created 2 views: list of hats and details for one hat.
        - GET and POST methods added to the list of hats. For the POST: called the PREXELS API to get a picture of a hat and have it stored into the newly created hat object.
        - GET, DELETE and PUT methods to the detailed hat object.
    - updated the polling method to poll the "location" value object from the wardrobe microservice.
    - checked that everything is working fine inside the Insomnia.

- Frond End:
    - Updated the APP.js file with routing all proper modules.
    - Created HatForm.js:
        - creates a new hat when click on "create".
        - able to select a location via a dropdown menu.
        - have placeholders to describe each inputs.
    - Created HatList.js:
        - display all hats with their details: style name, image, fabric, color, location, date of creation.
        - created a "delete" button for each row: when clicked, the corresponding hat is removed from the database and from the browser's page.
    - Updated the Nav.js file to link to newly created paths.

- Added the connections to have the Shoes microservice working as well with the wardrobe and hats microservice.
