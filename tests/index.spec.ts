import request from 'supertest';
import app from '../src/app';

import { messages, statusCodes } from '../src/utils'


describe('Hospitality Integration Tests', () => {    
    it('should return correct result when reservationId and req.body are supplied correctly(weekend)', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12000}`)
            .send({
                "day": "Saturday",
                "exitDateTime": "2021-01-02 12:00"
            })
            .set('Accept', 'application/json')

        expect(response.body.message).toEqual(messages.success)
        expect(response.body.statusCode).toEqual(statusCodes.success)
        expect(response.body.data).toEqual(920000)
    });

    it('should error out for wrong reservationId type', async () => {
        const abc = 'abc'
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${abc}`)
            .send({
                "day": "Saturday",
                "exitDateTime": "2021-02-02 12:00"
            })
            .set('Accept', 'application/json')

        expect(response.body.error).toEqual(messages.badRequest('reservationId'))
        expect(response.body.statusCode).toEqual(statusCodes.badRequest)
    });

    it('should error out when day is not supplied', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12001}`)
            .send({
                "day": "",
                "exitDateTime": "2021-01-02 03:00"
            })
            .set('Accept', 'application/json')

        expect(response.body.error).toEqual(messages.badRequest('day'))
        expect(response.body.statusCode).toEqual(statusCodes.badRequest)
    });

    it('should error out when exitDateTime is not supplied', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12001}`)
            .send({
                "day": "Thursday",
                "exitDateTime": ""
            })
            .set('Accept', 'application/json')

        expect(response.body.error).toEqual(messages.badRequest('exitDateTime'))
        expect(response.body.statusCode).toEqual(statusCodes.badRequest)
    });

    it('should throw an error when booking is not found', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${100}`)
            .send({
                "day": "Monday",
                "exitDateTime": "2021-01-02 07:00"
            })
            .set('Accept', 'application/json')

        expect(response.body.error).toEqual(messages.notFound)
        expect(response.body.statusCode).toEqual(statusCodes.notFound)
    });

    it('should return correct result when correct values are supplied for weekday', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12001}`)
            .send({
                "day": "Monday",
                "exitDateTime": "2021-01-08 12:00"
            })
            .set('Accept', 'application/json')
            
            expect(response.body.message).toEqual(messages.success)
            expect(response.body.statusCode).toEqual(statusCodes.success)
            expect(response.body.data).toEqual(1924500)
    });

    it('should return correct result when room type is palatial', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12002}`)
            .send({
                "day": "Wednesday",
                "exitDateTime": "2021-01-07 12:00"
            })
            .set('Accept', 'application/json')
            
            expect(response.body.message).toEqual(messages.success)
            expect(response.body.statusCode).toEqual(statusCodes.success)
            expect(response.body.data).toEqual(9492000)
    });

    it('should return correct result when reservationId is available and rate is week day', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12003}`)
            .send({
                "day": "Friday",
                "exitDateTime": "2021-01-02 12:00"
            })
            .set('Accept', 'application/json')

            expect(response.body.message).toEqual(messages.success)
            expect(response.body.statusCode).toEqual(statusCodes.success)
            expect(response.body.data).toEqual(858000)
    });

    it('should return correct result when reservationId is available and rate is weekend', async () => {
        const response = await request(app)
            .post(`/api/v1/calculate-overstay-fees/${12003}`)
            .send({
                "day": "Sunday",
                "exitDateTime": "2021-01-04 12:00"
            })
            .set('Accept', 'application/json')

            expect(response.body.message).toEqual(messages.success)
            expect(response.body.statusCode).toEqual(statusCodes.success)
            expect(response.body.data).toEqual(220000)
    });
});