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

  describe('User sign up model tests', () => {

  })


  describe('Business model tests', () => {
    let userId;

    beforeAll(async () => {
      const userInfo = { username: 'user', email: 'user@user.com', password: 'test', role: 'business' };
      const user = User.createUser(userInfo);
      userId = user.id;
    })

    describe('create a business functionality', () => {
      let newBusinessId;

      it('should create a business with the correct properties', async () => {
        const newBusinessInfo = { userId, name: 'Test business' };
        const newBusiness = await Business.createBusiness(newBusinessInfo);
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

      // creating mock users
      const consumerInfo = { username: 'user', email: 'user@user.com', password: 'test', role: 'consumer' };
      const consumer = User.createUser(consumerInfo);
      const consumerId = consumer.id;
      const adminInfo = { username: 'admin', email: 'admin@admin.com', password: 'test', role: 'business' };
      const admin = User.createUser(adminInfo);
      const adminId = admin.id;

      // creating mock business
      const businessInfo = { userId: adminId, name: 'Cat Salon' };
      const business = await Business.createService(businessInfo);
      const businessId = business.id;

      // creating mock services
      const service1Info = { businessId, name: 'Whisker and nail trim', price: 50, duration: 60 };
      const service1 = await Business.createService(businessInfo);
      const service1Id = service1.id;
      const service2Info = { businessId, name: 'Paw rub', price: 25, duration: 30 };
      const service2 = await Business.createService(businessInfo);
      const service2Id = service2.id;

      // creating mock timeslots
      const timeslot1Info = { service1Id, startTime: '2023-10-31 10: 30: 00' };
      const timeslot1 = await Business.createTimeslot(timeslot1Info);
      const timeslot1Id = timeslot1.id;
      const timeslot2Info = { service1Id, startTime: '2023-10-31 11: 30: 00' };
      const timeslot2 = await Business.createTimeslot(timeslot2Info);
      const timeslot2Id = timeslot2.id;
    })

    describe('get all services functionality', () => {
      it('should get all services for a given business', async () => {
        const services = await User.getServices({ businessId });
        expect(services.length).toEqual(2);
      })
    })

    describe('get all time slots functionality', () => {
      it('should get all time slots for a given service', async () => {
        const services = await User.getTimeslots({ service1Id });
        expect(services.length).toEqual(2);
      })
    })

    describe('book a reservation', () => {
      it('should book a new reservation', async () => {
        const reservation = await User.createReservation( {})

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