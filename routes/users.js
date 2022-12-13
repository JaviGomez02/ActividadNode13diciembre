const express = require('express')
const router = express.Router()
const { addUser, getUsers, delUser, updateUser} = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isValidRol, existEmail, existUser } = require('../helpers/db-validators')
const { validateJWT } = require('../middlewares/validate-jwt')
const { isAdminRol, hasRol } = require('../middlewares/validate-rol')

router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/',[
    check('email','Email is invalid').isEmail(),
    check ('email').custom(existEmail),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol),
    validateFields
] ,addUser)

router.delete('/:id', [
    validateJWT,
    isAdminRol,
    hasRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existUser),
    validateFields
], delUser)

router.put('/:id',[
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existUser),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    check('rol').custom( isValidRol),
    validateFields
], updateUser)

module.exports = router