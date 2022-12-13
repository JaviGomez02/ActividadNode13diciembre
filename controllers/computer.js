const {request, response} = require('express')
const Computer = require('../models/computer')


const getComputers= async(req,res) =>{
    const computers=await Computer.find()
    res.json(computers);
}

const getComputer= async(req,res) =>{
    const {id} = req.params;
    const computers=await Computer.findById(id)
    res.json(computers);
}

const postComputer=async(req, res)=>{
    const { name, type, price} = req.body;
    const existsName = await Computer.findOne({ name});
    if (existsName) {
        return res.status(400).json({
            "msg": "Name already exists"
        })
    }

    const computer = new Computer({name, type, price})

    res.json(computer)
}

const delComputer=async(req=request,res=response)=>{
    const id= req.params.id;
    const computer=await Computer.findByIdAndDelete(id)
    res.json(computer)
}

const updateComputer=async(req=request, res=response)=>{
    const {id}=req.params;
    const {_id,...userBody}=req.body;

    const computer = await Computer.findByIdAndUpdate(id, userBody)
    
    res.json(computer)
}

module.exports={getComputer, getComputers, postComputer, delComputer, updateComputer}