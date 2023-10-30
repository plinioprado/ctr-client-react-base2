# ctr-client-react-base

Front-end application in React that provides a base for Business and Finance Applications. Coded from zero based on the features of ctr-client-react and focus on:

* The latest technologies and approaches.
* A pair of components AuxList and AuxItem able to handle multiple auxiliary tables using data+format responses.

Scope:

* Login: The simplest that allows access per features according to entitlements per role
* Settings
* Users
* Roles
* Tenants
* Countries: Base ISO 3166
* Currencies: Base ISO 4217

Connects to the server ctr-server-node-base to provide the data+format responses based in Node and PostgreSQL for faster development, but its MVC model was designed to be applied to any Language and database.

## The data+format approach

The pair of reusable React components AuxList and AuxItem will handle a given Table using responses containing:

* data is either:

  * A List array, containing objects with the cells to be displayed in a html table. Plus a Create button and Update links in the 1st column of each row.
  * An Item object, containing the fields to be displayed in an html form with options to Return, Delete, or Submit (for creation or update).

* format is an object, containing:

  * Some properties to display on the page, like List Header, Item header...
  * An array of fields containing properties defining the data display and business rules, like the following example:

    ``` js
    {
      name: 'tenant_cod',
      listPosition: 0,
      formPosition: 7,
      type: 'select',
      default: 'default',
      readonly: true,
      required: true,
      label: 'Tenant',
      width: 6,
      options: [
        {
          value: 'default',
          text: 'default'
        }
    }
    ```

The 'type', in this context, will direct to a specific type of Html Field among:

* boolean (select between true and false)
* password
* select (the only that will use 'options')
* serial (numeric serial)
* text (the default)

A successful Login request will return a Session object containing, among other info, an Access object where the key is each Table name and its value the rights for Create/Read/Update/Delete.

## Stack

* react
* react-bootstrap
* react-router-dom

## Endpoints

Related to the tables role, setting, tenant, and user (require authentication)

* Show a list: GET /api/:table
* Show a record by cod: GET /api/:table/:cod
* Create a record: POST /api/:table
* Update a record: PUT /api/:table
* Delete a record: DELETE /api/:table/:cod

Others

* Login and get session if successful: POST /api/login
* Reset database: GET /api/install/resetdb (require authentication)

## Notes

Not running StrictMode to avoid double calling to server

Npm install is showing a few vulnerabilities but they are in the react-scripts that is a devDependency. Running npm audit --production shows no vulnerbility.

## Contribution

* Any suggestion or info request, make contact through www.linkedin.com/in/plinioprado.
