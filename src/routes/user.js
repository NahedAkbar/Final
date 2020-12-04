const express = require("express");
const user = express.Router();
const jwt= require('jsonwebtoken');
const db = require('../config/database')


//ruta para agregar un nuevo usuario a la db
user.post("/", async(req,res,next) => {
    const {user_name, user_lastName, user_mail, user_phone ,user_position, user_password} = req.body;
    
    if(user_name && user_lastName && user_mail && user_phone && user_position && user_password ){
        
        let query = "INSERT INTO user(user_name, user_lastName, user_mail, user_phone , user_position, user_password)"

        query += ` VALUES ('${user_name}', '${user_lastName}',
        '${user_mail}', '${user_phone}', '${user_position}', '${user_password}');`;
        
        const usuario = await db.query(query);

        if(usuario.affectedRows == 1){
            return res.status(201).json({code:201, message:"Usuario insertado Correctamente"});
        }
        return res.status(500).json({code:500, message:"oh oh Ocurrio un error"});
    }

    return res.status(500).json({code:500, message:"Campos incompletos"});
    
});
//ruta para eliminar usuario de la db
user.delete("/delete/:id([0-9]{1,3})", async(req,res,next)=>{
    const query = `DELETE FROM user WHERE user_id = ${req.params.id}`;
    const user = await db.query(query);

    if(user.affectedRows == 1){
        return res.status(200).json({code:200, message:"Usuario Eliminado Correctamente"});
    }
    return res.status(404).json({code:404, message:"Usuario No Encontrado"});
});
//ruta para modificar por completo al usuario
user.put("/modify/:id([0-9]{1,3})" , async(req,res,next) =>{
    const {user_name, user_lastName, user_mail, user_phone, user_position, user_password} = req.body;

    if(user_name && user_lastName && user_mail && user_phone && user_position && user_password){
        let query = `UPDATE user SET user_name='${user_name}', user_lastName='${user_lastName}',`;
        query += ` user_mail='${user_mail}',  user_phone='${user_phone}, 'user_position='${user_position}',user_password='${user_password}' WHERE user_id = '${req.params.id}';`;
        
        const user = await db.query(query);

        if(user.affectedRows == 1){
            return res.status(200).json({code:200, message: "Usuario Actualizado Correctamente"});
        }
        return res.status(500).json({code:500, message:"oh ooh ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"})
});
//ruta para obtener todos los usuarios
user.get('/all/' , async(req,res,next)=>{
    const user = await db.query("SELECT * FROM user");
    
    return res.status(200).json({code:1, message:user});
});
//ruta para obtener un usuario por id
user.get('/:id([0-9]{1,3})', async(req,res,next)=>{
    const id = req.params.id;

    if(id >= 1 && id <= 100){
        const user = await db.query(`SELECT * FROM user WHERE user_id ='${id}';`);
        
        return res.status(200).json({code:1 , message:user})
    }
    
    return res.status(404).json({code: 404, message: "usuario no encontrado"});
    
});

user.get("/:name([A-Za-z]+)", async(req,  res, next)=>{
    const name = req.params.name;

    const user = await db.query(`SELECT * FROM user WHERE user_name= '${name}' ;`);
    if (user.length !=0){
        return res.status(200).json({code: 200, message: user});
    }
    else{
        return res.status(404).send({code: 404, message: "Usuario no encontrado"});
    }
});

//va al final
module.exports=user;