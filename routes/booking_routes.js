import express from 'express'
import { PetsModel, BookingModel } from '../db.js'


const router = express.Router()

//get all
router.get('/', async (req, res) =>res.send(await BookingModel.find().populate({ path: 'booking', select: 'petName' })))

//get by id
router.get('/:id', async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.id).populate({ path: 'booking', select: 'petName' })
        if (booking) {
            res.send(booking)
        } else {
            res.status(404).send({ error: 'Not Found'})
        }
    }
    catch (err) {
        res.status(404).send({ error: err.message })
    }
})

//Post request
router.post('/', async (req, res) => {
    try {
        const { petName, name, date, contactInfo } = req.body
        // const bookingObject = await BookingModel.findOne( {type : type})
        const newBooking = { petName, name, date, contactInfo }

        const insertedBooking = await BookingModel.create(newBooking)

        res.status(201).send(await insertedBooking.populate({ path: 'booking', select: 'petName'}))
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


//delete profile
router.delete('/:id', async (req, res) => {
    try {
      const booking = await BookingModel.findByIdAndDelete(req.params.id)
      if (booking) {
        res.sendStatus(204)
      } else {
        res.status(404).send({ error: 'Booking not found' })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
  })

//Update
router.put('/:id', async (req, res) => {
    const { petName, name, date, contactInfo } = req.body
    const newBooking = { petName, name, date, contactInfo }
    
    try {
      const booking = await BookingModel.findByIdAndUpdate(req.params.id, newBooking, { returnDocument: 'after' })
      if (booking) {
        res.send(booking)
      } else {
        res.status(404).send({ error: 'Booking not found' })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
  })

export default router
