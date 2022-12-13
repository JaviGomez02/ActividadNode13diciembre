const express = require('express')
const router = express.Router()
const {getBeers, getBeer, addBeer, deleteBeer, editBeer} = require('../controllers/cervezas')
const { validateFields } = require('../helpers/validate-fields')

router.get('/', getBeers)
router.get('/:id', getBeer)
router.post('/', addBeer)
router.delete('/:id', deleteBeer)
router.put('/:id', editBeer)

module.exports = router