const bcrypt = require('bcryptjs/dist/bcrypt');
const { response, request } = require('express');
const { genJWT } = require('../helpers/genJWT');
const User = require('../models/usuario')

async function enterLogin(req = request, res = response) {
    const { email, password } = req.body;
    const usuario=await User.findOne({ email})
    if (!usuario) {
        return res.status(400).json({
            "msg": "Email dont exists"
        })
    }
    if(!bcrypt.compareSync(password, usuario.password)){
        return res.status(400).json({
            "msg": "Incorrect password"
        })
    }
    if(usuario.state!=true){
        return res.status(400).json({
            "msg": "Inactive user"
        })
    }
    //Generamos el jwt
    const token = await genJWT(usuario._id)
    res.json( 
        usuario,
        token
    );
}

module.exports = {enterLogin}