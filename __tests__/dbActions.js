const path = require('path');
// require('dotenv').config()
const Business = require('../server/models/Business');
const { pool, createTables } = require('../server/config/connect');

describe('SQL unit tests', () => {
  beforeAll(async () => {
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS businesses CASCADE');
    await pool.query('DROP TABLE IF EXISTS services CASCADE');
    await pool.query('DROP TABLE IF EXISTS timeslots CASCADE');
    await pool.query('DROP TABLE IF EXISTS reservations CASCADE');
    await createTables(); // make sure this exists in connect
  });


  describe('Business model tests', () => {

    describe('create a business functionality', () => {
      let newBusinessId;

      it('should create a business with the correct properties', async () => {
        const newBusinessInfo = { name: 'Test business' };
        const newBusiness = await Business.createService(newBusinessInfo);
        newBusinessId = newBusiness.id;
        expect(newBusiness.id).toBeDefined();
        expect(newBusiness.name).toEqual(newBusinessInfo.name);
      });
      
      afterEach(async () => {
        // delete business (newBusinessId);
      })
    })

    describe('create a service functionality', () => {
      let businessId;
      let newServiceId;

      beforeEach(async () => {
        const businessInfo = { name: 'SW Archery' };
        const business = await Business.createService(businessInfo);
        businessId = business.id;
      })

      it('should create a service with the correct properties', async () => {
        const newServiceInfo = { businessId, name: 'Advanced Archery', price: 35, duration: 45 }
        const newService = await Business.createService(newServiceInfo);
        newServiceId = newService.id;
        expect(newService.id).toBeDefined();
        expect(newService.name).toEqual('Advanced Archery');
      })

      afterEach(async () => {
        // delete service (newServiceId)
        // delete business (businessId)
      })

    })

    describe('create a time slot functionality', () => {
      let businessId;
      let serviceId;
      let newTimeslotId;

      beforeEach(async () => {
        const businessInfo = { name: 'Archery Paradise' };
        const business = await Business.createService(businessInfo);
        businessId = business.id;
        const serviceInfo = { businessId, name: 'Beginner Archery', price: 25, duration: 60 };
        const service = await Business.createService(businessInfo);
        serviceId = service.id;

      })

      it('should create a time slot with the correct properties', async () => {
        const newTimeslotInfo = { serviceId, startTime: '2023-10-31 12: 30: 00' };
        const newTimeslot = await Business.createTimeslot(newTimeslotInfo);
        expect(newService.id).toBeDefined();
        expect(newService.endTime).toEqual('2023-10-31 13: 30: 00');
      })

      afterEach(async () => {
        // delete timeslot (newTimeslotId)
        // delete service (serviceId)
        // delete business (businessId)
      })
    })
  })

  describe('User model tests', () => {
    beforeAll(async () => {
      // creating mock business
      const businessInfo = { name: 'Cat Salon' };
      const business = await Business.createService(businessInfo);
      businessId = business.id;

      // creating mock services
      const service1Info = { businessId, name: 'Whisker and nail trim', price: 50, duration: 60 };
      const service1 = await Business.createService(businessInfo);
      service1Id = service1.id;
      const service2Info = { businessId, name: 'Paw rub', price: 25, duration: 30 };
      const service2 = await Business.createService(businessInfo);
      service2Id = service2.id;

      // creating mock timeslots
      const timeslot1Info = { serviceId, startTime: '2023-10-31 10: 30: 00' };
      const timeslot1 = await Business.createTimeslot(timeslot1Info);
      timeslot1Id = timeslot1.id;
      const timeslot2Info = { serviceId, startTime: '2023-10-31 11: 30: 00' };
      const timeslot2 = await Business.createTimeslot(timeslot2Info);
      timeslot2Id = timeslot2.id;
    })

    describe('get all services functionality', () => {
      it('should get all services for a given business', async () => {

      })
    })

    describe('get all time slots functionality', () => {
      it('should get all time slots for a given service', async () => {

      })
    })

    describe('book a reservation', () => {
      it('should book a new reservation', async () => {

      })
    })
  })



});

/*
User Routes
- all the services offered by a business (choose a class)
- available time slots for a certain service
- book a reservation for a certain time slot
- stretch: fetch all reservations for a user

Business Routes
- create a service (given a name, price, duration, instructor)
- create a slot (given a class and start time)
  > this would also entail fetching all classes (same route as user route)
*/