const { expect } = require('chai');

const BASE_URL = 'https://restful-booker.herokuapp.com';

describe('Restful-Booker API Tests', () => {
    let token;
    let bookingId;

    it('Scenario 1: Create an auth token', async () => {
        const response = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'password123'
            })
        });

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.include('application/json');

        const data = await response.json();
        expect(data).to.have.property('token');
        expect(data.token).to.be.a('string');

        token = data.token;
    });

    it('Scenario 2: Create a new booking', async () => {
        const payload = {
            firstname: 'Victor',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-04-01',
                checkout: '2026-04-15'
            },
            additionalneeds: 'Breakfast'
        };

        const response = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.include('application/json');

        const data = await response.json();
        expect(data).to.have.property('bookingid');
        expect(data.booking.firstname).to.equal('Victor');

        bookingId = data.bookingid;
    });

    it('Scenario 3: Get the created booking by ID', async () => {
        const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.include('application/json');

        const data = await response.json();
        expect(data.firstname).to.equal('Victor');
        expect(data.lastname).to.equal('Brown');
    });

    it('Scenario 4: Update the booking', async () => {
        const updatedPayload = {
            firstname: 'Bictor',
            lastname: 'Brown',
            totalprice: 150,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-04-01',
                checkout: '2026-04-15'
            },
            additionalneeds: 'Lunch'
        };

        const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            body: JSON.stringify(updatedPayload)
        });

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.include('application/json');

        const data = await response.json();
        expect(data.firstname).to.equal('Bictor');
        expect(data.totalprice).to.equal(150);
    });

    it('Scenario 5: Remove the booking', async () => {
        const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        });

        expect(response.status).to.equal(201);
        expect(response.headers.get('content-type')).to.include('text/plain');

        const data = await response.text();
        expect(data).to.equal('Created');
    });
});