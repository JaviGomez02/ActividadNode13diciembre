const express = require('express')
const { check } = require('express-validator')
const { getComputer, getComputers, postComputer, delComputer, updateComputer } = require('../controllers/computer')
const { validateFields } = require('../helpers/validate-fields')
const { hasRol, isAdminRol } = require('../middlewares/validate-rol')
const router = express.Router()

router.get('/', getComputers)
router.get('/:id', getComputer)

router.post('/',[
    hasRol('ADMIN_ROLE', 'SELL_ROLE'),
    check('name','Name is mandatory').not().isEmpty(),
    check('name','Name has to be more than 2 characters').isLength({ min: 2, max: 100 }),
    check('type','Type is mandatory').not().isEmpty(),
    check('type','Type has to be more than 2 characters').isLength({ min: 2, max: 100 }),
    check('price','Price is greater than 0').isInt({min:0}),
    validateFields
], postComputer)

router.delete('/:id',[
    hasRol('ADMIN_ROLE', 'DELETE_ROLE'),
    validateFields
], delComputer)

router.put('/:id',[
    isAdminRol,
    check('name','Name is mandatory').not().isEmpty(),
    check('name','Name has to be more than 2 characters').isLength({ min: 2, max: 100 }),
    check('type','Type is mandatory').not().isEmpty(),
    check('type','Type has to be more than 2 characters').isLength({ min: 2, max: 100 }),
    check('price','Price is greater than 0').isInt({min:0}),
    validateFields
], updateComputer)

module.exports = router