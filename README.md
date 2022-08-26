# hospitality-service
App that calculates overstay fees for customer occupying a booked apartment.

## Getting Started

```
# Clone the repository
>$ git clone https://github.com/danoseun/hospitality-service.git

# Change directory into it
>$ cd hospitality-service

# Install all dependencies
> npm install

# Create a .env file and fill it with the sample provided in .env.sample file
> $ touch .env


# Start the application in production mode
> $ npm run start

# Open running application on browser
> http:localhost:2023/api/v1
If you change the port in your .env file then use the port instead of the one above

```

## The following assumptions were made while building the project
* The overstay fees will be calculated individually by the admin of the app when the following values are supplied: 
   `reservationId`, `day` and `exitDateTime`.
* The reservationId will be supplied via the `req.params` while the `day` and `exitDateTime` will be made available via `req.body`.
* reservationId should be digits only.
* day could be any day of the week from `Monday-Sunday`(in this lettering format, ordinarily, the frontend would supply this to the backend).
* exitDateTime should be in this format "yyyy-mm-dd HH:MM" e.g "2021-01-02 12:00".
* This product is for the Nigerian market so all amounts returned as a result are in NGN(Naira).
* For simplicity, validation was written in vanilla js.
* For simplicity, no ORMS were used to communicate with the DB.
* The supplied DB records in the document were seeded into the DB, hence those are the only values that can be used.
   * This also means that data can not be submitted to the DB currently.

## Improvements
* Using a validation library like joi, celebrate, express-validator et.c for more fine-grained validation.
* On further discussion form a product point of view, the app features or functionality can be expanded

 
## Application features
* Admin can calculate overstay fees when they enter reservationId, day and exitDateTime.


## Base URL
* The project's base URL can be acessed by clicking on this link [Here](https://hospitality-company.herokuapp.com/api/v1)

## Running the tests
* Run the test with the command  
`> $ npm test`

## Built with
Typescript
Node
Express
Postgres

