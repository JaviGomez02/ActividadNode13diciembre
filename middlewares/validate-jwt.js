const {request, response}= require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario')

const validateJWT = async(req=request, res=response, next) => {
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user=await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg:'Token no valido - usuario inexistente'
            })
        }
        
        if(!user.state){
            return res.status(401).json({
                msg:'Token no valido - usuario deshabilitado'
            })
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {validateJWT}