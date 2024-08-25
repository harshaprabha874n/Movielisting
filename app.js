require ("dotenv").config();
const moviesRoutes=require("./routes/movies/movies.js");

const db =require("./db/index");


const express = require("express");
const app = new express();
app.use(express.json());
//const port = 8081;
const port = process.env.PORT || 8081;
app.use("/movies",moviesRoutes);

db();




app.listen(port,()=>{
    console.log(`Express app listening at http://localhost:${port}`);
});
//run the command-node app.js
//to stop ->ctrl + c
//environment - to store secret keys and also some application server
//REST ->gives JSON Values(key-value pairs)


