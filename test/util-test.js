const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const INTERCOM_LATITUDE = 53.339428
const INTERCOM_LONGITUDE = -6.257664
const TEST_LATITUDE = 52.986375
const TEST_LONGITUTE = -6.043701

const Utils = require('../lib/utils')
const utils = new Utils()

describe('checking util class', () => {

    it('convert to radians', (done) => {
        let answer = utils.convertDegreesToRadians(180)
        expect(answer).to.equal(Math.PI)
        done()
    })

    it('calculate great circle distance test', (done) => {
        let convertDegreesToRadians = utils.convertDegreesToRadians
        let expectedAnswer = 41.815535844645424
        let distance = utils.calculateGreatCircleDistance(
            convertDegreesToRadians(INTERCOM_LATITUDE),
            convertDegreesToRadians(TEST_LATITUDE),
            convertDegreesToRadians(INTERCOM_LONGITUDE),
            convertDegreesToRadians(TEST_LONGITUTE)
        )
        expect(distance).to.equal(expectedAnswer);
        done()
    })

})