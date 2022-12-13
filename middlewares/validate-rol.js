const {request, response}= require('express');
const User = require('../models/usuario')

const isAdminRol = (req=request, res=response, next)=>{
    const user=req.user;
    if(!user){
        return res.status(500).json({
            msg: 'Usuario inexistente'
        })
    }

    const  {rol,name}=user;

    if(rol!="ADMIN_ROLE"){
        return res.status(401).json({
            msg: 'El usuario '+name+' no es administrador'
        })
    }

    next()
}

const hasRol=(...roles) => {
    return (req=request,res=response, next)=>{
        const user=req.user;
        if(!user){
            return res.status(500).json({
                msg: 'Usuario inexistente'
            })
        }

        if(!roles.includes(user.rol)){
            return res.status(401).json({
                msg: 'Rol no existente'
            })
        }

        next()
    }
}




module.exports = {isAdminRol, hasRol}