import express from 'express'
import { ContactModel } from '../db.js'

const router = express.Router()

//get all
router.get('/', async (req, res) =>res.send(await ContactModel.find().populate({ path: 'contact', select: 'name' })))

router.post('/', async (req, res) => {
    try {
        const { name, email, message }  = req.body
        const newContact = { name, email, message }

        const insertedContact = await ContactModel.create(newContact)

        res.status(201).send(await insertedContact.populate({ path: 'contact', select: 'name'}))
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})



export default router
