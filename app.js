import  express  from "express"
import pet_routes from "./routes/pet_routes.js"
import booking_routes from "./routes/booking_routes.js"
import contact_routes from "./routes/contact_routes.js"
import cors from 'cors'


const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'The Pet Adoption Service' }))

app.use('/pets', pet_routes)

app.use('/bookings', booking_routes)

app.use('/contact', contact_routes)

export default app