const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const getUsers=async(req,res) =>{
    const users=await User.find().limit().skip();
    res.json(users);
}

const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;
    const existsEmail = await User.findOne({ email});
    if (existsEmail) {
        return res.status(400).json({
            "msg": "Email already exists"
        })
    }
    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    
    await user.save();

    res.json(
        user
    )

}

const delUser=async(req=request,res=response)=>{
    const id= req.params.id;
    const user=await User.findByIdAndUpdate(id, {"state": false});
    const authenticatedUser=req.user
    res.json(user, authenticatedUser)
}

const updateUser=async(req=request, res=response)=>{
    const {id}=req.params;
    const {_id, email,state,...userBody}=req.body;

    const salt = bcryptjs.genSaltSync();
    userBody.password = bcryptjs.hashSync( userBody.password, salt );
    const user = await User.findByIdAndUpdate(id, userBody)
    
    res.json(user)

}

// const editUser=async(req=request, res=response)=>{
//     const id= req.params.id;
//     const user=req.body;
// }

module.exports = {addUser, getUsers, delUser, updateUser}