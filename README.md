#  Restaurant Reservation System

Link to live application: [Restaurant Reservation System](https://mi-reservation-frontend.herokuapp.com)

## API Endpoints


|          **URL**                                  |      **Method**     |   **Description**                                                                              |							
| ------------------------------------------------- | --------------------|----------------------------------------------------------------------------------------------- |
| `/reservations `                                  | POST                | Creates a new reservations                              				           |
| `/reservations?date=YYYY-MM-DD`                   | GET                 | Lists reservations for the date param                                                          |
| `/reservations?mobile_number=XXX-XXX-XXXX`	    | GET		  | Lists reservations for the phone number param						   |
| `/reservations/:reservation_id`   	  	    | GET		  | Gets reservation for specific ID								   |
| `/reservations/:reservation_id`		    | PUT		  | Updates reservation for a specific ID							   |
| `/reservations/:reservation_id/status`	    | PUT		  | Updates the reservation status of a specific reservation					   |
| `/tables`					    | GET		  | Lists all tables										   |
| `/tables`					    | POST		  | Creates a new table										   |
| `/tables/:table_id/seat`			    | PUT		  | Assigns a reservation to a table								   |
| `/tables/:table_id/seat`			    | DELETE		  | Removes a reservation from a table								   |

## Summary

The restaurant reservation system allows the user to create both reservations and tables to help manage customer traffic in a restaurant. The reservations can be created for any time in the future that the restaurant is open. Tables can be created and reservations can be assigned to the tables as they are seated. Once the party leaves, the table is "Finished", resetting the table and clearing the reservation from the Dashboard. Other functionality, such as editing and cancelling reservations is also available. Below are screenshot with how each page works. 

 ### Dashboard

- Shows all reservations for a date (default date is the current date)
- Shows all tables 

![dashboard](https://user-images.githubusercontent.com/85589086/144936061-4b29e81f-d2b1-4d5d-9096-25beb9e443c4.JPG)

### Seat

- Selecting the "Seat" button on one of the reservations redirects you to the page below
- Here you can select a table to seat the reservation at, as long as there is sufficient capacity
- Once a table has a reservation seated, the table status will change to occupied

![Seat](https://user-images.githubusercontent.com/85589086/144936453-bbba72f6-4eba-42b1-a939-dc9a45f88867.JPG)

### Edit

- Selecting the "Edit" button will redirect to the reservation form
- The form will have the details of the selected reservation pre-filled
- From there you can make changes to the reservation and update the reservation

![Edit](https://user-images.githubusercontent.com/85589086/144936691-adf7ebea-5045-4168-8723-394c66ad58ae.JPG)

### Finish

- Once a table is cleared the user can select "Finish" to change the status to "free"
- This will also remove the reservation from the reservations list

![finish](https://user-images.githubusercontent.com/85589086/144937135-a9c0723e-b85d-49c2-a82e-db22746befc7.JPG)

### New Table

- The new table page allows the user to create a new table
- Choose a name and enter the table capacity
- Newly created tables will appear on the dashboard

![New table](https://user-images.githubusercontent.com/85589086/144938901-9998fcc2-1de7-4677-b2ff-db7e72e05079.JPG)

### New Reservation

- The new reservation page will allow the user to create a new reservation
- Once the form is submitted the user will be directed to the dashboard for the date of the reservation made

![Create Reservation](https://user-images.githubusercontent.com/85589086/144939054-9bc47384-bcf1-4b6e-b2c0-e11b6d347d40.JPG)

### Search

- Allows the user to search for reservations by phone number
- The page will list all reservations, regardless of status

![Search](https://user-images.githubusercontent.com/85589086/144939229-e8b7df75-4a66-49ec-b814-eb1eb676de84.JPG)


## Tech Stack

|          **Front-end**                                          |                              **Back-end**                                                      |							
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| React                                                           | Node.js			                              				           |
| JavaScript                                                      | Express				                                                           |
| CSS/Bootstrap							  | PostgreSQL											   |
| HTML								  | Knex											   |

## Local Installation

1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than http://localhost:5000.
6. Run npm install to install project dependencies.
7. From the `./back-end` folder run 
	 - `npx knex migrate:latest`
	 - `npx knex seed:run`
8. Run npm run start:dev to start your server in development mode.
