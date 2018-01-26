const chai = require('chai')
const expect = chai.expect
const assert = chai.assert

const ValidatorClass = require('../lib/validator')
const validator = new ValidatorClass()

describe('checking validator class', () => {

    it('checking with correct data', (done) => {
        let result = validator.validateCustomerData({
            name : 'Test',
            user_id: 1,
            latitude: 53.12,
            longitude: -1.232
        })

        expect(result).to.be.true;
        done()
    })


    it('check with missing data', (done) => {
        let result = validator.validateCustomerData({
            name : 'Test',
            latitude: 53.12,
            longitude: -1.232
        })

        expect(result).to.be.false;
        done()
    })


})