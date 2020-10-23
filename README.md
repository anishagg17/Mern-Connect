Link to repo : https://github.com/anishagg17/Mern-Connect

It is an online platform based on MERN architecture to allow developers to connect with each other, share posts, comment on posts, upload profiles via APIs. It is a full stack application created with Node.Js, React.Js, ExpressJs, and uses MongoDB as a database.

# Local installation:
``` 
git clone git@github.com:anishagg17/Mern-Connect.git
cd Mern-Connect
npm i
cd client
npm i
``` 

# Running Application:

### Start Server :
``` Node server.js  ``` 


We can run server in development mode using nodemon instead of node
``` nodemon server.js ``` 


### Start Client :
``` npm start ``` 


We can run server and client both simultaneously using concurrently module.
concurrently \"npm run server\" \"npm run client\"
Or 
``` npm run dev ``` 


## Backend:
It consists of an express server along with several routers, models, middleware and controllers.

`Db.js` :  It contains code to establish connection to the dataBase

`Server.js` : It consists of an express server application which routes to different controllers and is responsible for running the application.

`models` : It consists of several definitions of objects, whose shema are defined using mongoose-Schema . Attributes may be of type:  String, Date, etc.Some attributes have been marked as required, some have default value set.

`routes/api` : These are sets of controllers which are responsible to handle requests based on type of request(GET, POST, DELETE, PUT) and route and map it to specific code.  

`Middleware` : It is a middleware which is used to check if a user is authenticated or not. It makes use of jsonwebtoken and passes to the respective controller if the conditions satisfy.

## Frontend:

Client folder contains all code for the web-frontend application. It uses 

`React` : it is a JavaScript library for building user interfaces.

`Redux` : it is used to manage state of the application as a single source of truth.

`Axios` : It is used to Make http requests from Client side to server side.


