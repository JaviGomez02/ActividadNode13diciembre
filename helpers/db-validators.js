const Rol = require('../models/rol')
const User=require('../models/usuario')

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

const existEmail=async(email) =>{
	const emailDb = await User.findOne({ email});
    if (emailDb) {
		throw new Error(`Email ${email} already exists`)
    }
}

const existUser=async(id) =>{
	const idDb=await User.findById(id);
	if (!idDb){
		throw new Error(`User with id ${id} doesnt exist`)
	}
}


module.exports = { isValidRol, existEmail, existUser}