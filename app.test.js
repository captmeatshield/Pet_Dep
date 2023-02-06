import app from './app.js'
import request from 'supertest'


describe("App tests", () => {
    test('Get home page' , async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('The Pet Adoption Service')
      })


    describe('Get pets list', () => {
     let res
     
     beforeEach(async() => {
      res = await request(app).get('/pets')
      expect(res.status).toBe(200)
      expect(res.headers['content-type']).toMatch(/json/i)
     })

     it('should be an array', () => {
      expect(res.body).toBeInstanceOf(Array)
     })
     
     it('has correct data structure', () => {
      res.body.forEach(el => {
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        expect(el.age).toBeDefined()
        expect(el.type).toBeDefined()
      })
     })
    })

    test('crate new pet', async () => {
      const res = await request(app).post('/pets').send({

        profile_image: "jest-test",
        image2: "jest-test",
        image3: "jest-test",
        name: "jest-test",
        age: "jest-test",
        type: "jest-test",
        breed: "jest-test",
        about: "jest-test"
      })

      expect(res.status).toBe(201)
      expect(res.headers['content-type']).toMatch(/json/i)
      expect(res.body._id).toBeDefined()
      expect(res.body.name).toBeDefined()
      expect(res.body.name).toBe('jest-test')

    })

    describe('Get bookings list', () => {
      let res
      
      beforeEach(async() => {
       res = await request(app).get('/bookings')
       expect(res.status).toBe(200)
       expect(res.headers['content-type']).toMatch(/json/i)
      })
 
      it('should be an array', () => {
       expect(res.body).toBeInstanceOf(Array)
      })
      
      it('has correct data structure', () => {
       res.body.forEach(el => {
         expect(el._id).toBeDefined()
         expect(el.name).toBeDefined()
         expect(el.petName).toBeDefined()
         expect(el.contactInfo).toBeDefined()
       })
      })
     })
 
     test('crate new booking', async () => {
       const res = await request(app).post('/bookings').send({
 
        petName:"jest-test" ,
        name: "jest-test",
        date: "jest-test",
        contactInfo: "jest-test"
       })
 
       expect(res.status).toBe(201)
       expect(res.headers['content-type']).toMatch(/json/i)
       expect(res.body._id).toBeDefined()
       expect(res.body.name).toBeDefined()
       expect(res.body.name).toBe('jest-test')
 
     })

     describe('Get contact list', () => {
      let res
      
      beforeEach(async() => {
       res = await request(app).get('/contact')
       expect(res.status).toBe(200)
       expect(res.headers['content-type']).toMatch(/json/i)
      })
 
      it('should be an array', () => {
       expect(res.body).toBeInstanceOf(Array)
      })
      
      it('has correct data structure', () => {
       res.body.forEach(el => {
         expect(el._id).toBeDefined()
         expect(el.name).toBeDefined()
         expect(el.email).toBeDefined()
         expect(el.message).toBeDefined()
       })
      })
     })
 
     test('send through contact info', async () => {
       const res = await request(app).post('/contact').send({
 
        name: "jest-test" ,
        email: "jest-test",
        message: "jest-test"
       })
 
       expect(res.status).toBe(201)
       expect(res.headers['content-type']).toMatch(/json/i)
       expect(res.body._id).toBeDefined()
       expect(res.body.name).toBeDefined()
       expect(res.body.name).toBe('jest-test')
 
     })





  })
    
