const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const{enterLogin}= require('../controllers/login')
const { validateFields } = require('../helpers/validate-fields')

router.post('/',[
    check('email','Email is invalid').isEmail(),
    check('password','Password is mandatory').not().isEmpty(),
    validateFields
], enterLogin)

module.exports = router