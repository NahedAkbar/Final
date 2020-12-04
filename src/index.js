    //Dependencies
const morgan = require('morgan');
const express = require('express');   //aqui se importa la libreria express
const app = express();  //se crea una instancia 
const user = require('./routes/user');
const login = require('./routes/login');
    //middleware
const auth = require ('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());//para usar el body
app.use(express.urlencoded({ extended: true }));//para usar el body
    //Rutas
app.get("/" , index);
app.use("/login",login);
app.use(auth);
app.use("/user",user);
app.use(notFound);

app.listen(process.env.PORT ||3000, () => {
    console.log("Server is running... ;)")
});//uso de funcion flecha


