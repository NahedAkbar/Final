const express = require("express");
const login = express.Router();
const jwt= require('jsonwebtoken');
const db = require('../config/database')


login.post("/", async(req,res,next)=>{
    const{user_mail, user_password}=req.body;
    const query = `SELECT * FROM user WHERE user_mail='${user_mail}' AND user_password= '${user_password}';`;
    const user = await db.query(query);

    if(user_mail && user_password){
        if(user.length == 1){
            const token = jwt.sign({
                user_id: user[0].user_id,
                user_mail: user[0].user_mail
            }, "debugkey");

            return res.status(200).json({code:200, message:token});
        }
        else{
            return res.status(200).json({code:401, message:"Usuario y/o Contraseña incorrecta"});
        }
    }
    else{
        return res.status(200).json({code:500, message:"campos incompletos"})
    }
});


module.exports=login;