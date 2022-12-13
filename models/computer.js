const { Schema, model} = require('mongoose');

const ComputerSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    type: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    }

})


module.exports = model( 'Computer', ComputerSchema )

