const express = require('express')
const router =  express.Router()
const {
    deleteContact,
    updateContact,
    createContact,
    getContact,
    getContacts
} = require('../controllers/contactControllers.js')
const validateToken = require('../middlewares/validateTokenHandler.js')

router.use(validateToken)

router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)


module.exports = router