const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const DATA_PATH_MISSING_ERROR = 'Data path missing'

describe('checking Data class', () => {

    let DataModel = require('../lib/customer-data-model')
    it('path presence', (done) => {
        try {

            let dataModel = new DataModel()
        }
        catch (e) {
            assert.isOk(DATA_PATH_MISSING_ERROR, e)
            done()
        }

        assert.fail('Should throw an error','','')
    })

    it('data path provided', (done) => {
        try {
            let dataModel = new DataModel({
                dataPath : './data.txt'
            })
        }
        catch (e) {
            assert.isNotOk(DATA_PATH_MISSING_ERROR, e)
            done()
        }
        done()
    })

    it('load data test', (done) => {
        try {
            let dataModel = new DataModel({
                dataPath : './data.txt'
            })
            dataModel.loadCustomerData()
            dataModel.on('ready', () => {
                assert.isOk('ready event fired', 'got ready event')
                done()
            })
        } catch (e) {
            console.log(e)
        }

    })


    it('get customers within a range', (done) => {
        try {
            let dataModel = new DataModel({
                dataPath : './data.txt',
                INTERCOM_LATITUDE : 53.339428,
                INTERCOM_LONGITUDE : -6.257664
            })
            dataModel.loadCustomerData()
            dataModel.on('ready', () => {
                let results = dataModel.getCustomerWithinDistance(60)
                expect(results).to.be.an('array')
                expect(results[0]).to.be.ok
                expect(results[0].user_id).to.be.ok
                expect(results[0].name).to.be.ok
                done()
            })
        } catch (e) {
            assert.isNotOk('Should not throw error', e)
            done()
        }

    })


    it('calculate individual customer distance', (done) => {
        try {
            let dataModel = new DataModel({
                dataPath : './data.txt'
            })

            let distance = dataModel.getIndividualCustomerDistance({
                latitude : 40.12323,
                longitude: -1.23432,
                user_id : 1,
                name : 'test'
            })

            expect(distance).to.equal(1519.3689114205056)

            done()

        } catch (e) {
            assert.isNotOk('Should not throw error', e)
            done()
        }

    })


    it('Testing invalid path on loadData', (done) => {
        try {
            let dataModel = new DataModel({
                dataPath : './data.txt'
            })
            dataModel.loadCustomerData('../da')

        } catch (e) {
            assert.isOk('Should throw File not found error')
        }

        done()

    })

})