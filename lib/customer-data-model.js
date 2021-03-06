const readline = require('readline')
const fs = require('fs')

const UtilClass = require('./utils')
const utils = new UtilClass()
const EventEmitter = require('events')
const ValidatorClass = require('./validator')
const validator = new ValidatorClass()

class CustomerDataModel extends EventEmitter {

    constructor(opts) {
        super()
        opts = opts || {}
        this.dataPath = opts.dataPath
        this.INTERCOM_LATITUDE = opts.INTERCOM_LATITUDE || 53.339428
        this.INTERCOM_LONGITUDE = opts.INTERCOM_LONGITUDE || -6.257664


        if (!this.dataPath) {
            throw new Error("Data path missing")
        }

        this.intercomLatitudeInRadians = utils.convertDegreesToRadians(this.INTERCOM_LATITUDE)
        this.intercomLongitudeInRadians = utils.convertDegreesToRadians(this.INTERCOM_LONGITUDE)
        this.data = []

    }


    /*
        loadData Reads the data from a given file using a stream
        arguments :-
            path - Takes in an optional argument to load the data in case data set needs
            to changed dynamically

    */
    loadCustomerData(path) {
        let that = this
        path = path || this.dataPath

        try {
            fs.statSync(path)
        } catch (e) {
            throw new Error('File does not exist')
        }

        let readFileLine = readline.createInterface({
            input: fs.createReadStream(path)
        })

        readFileLine.on('error', (error) => {
            throw new Error('Error in read stream', error)
        })


        readFileLine.on('line', (chunk) => {
            let content = null
            try {
                content = JSON.parse(chunk)
                content.latitude = parseFloat(content.latitude)
                content.longitude = parseFloat(content.longitude)
                content.user_id = parseInt(content.user_id)
            } catch (e) {
                throw new Error("Error while parsing line", e)
            }

            if (!validator.validateCustomerData(content)) {
                 throw new Error("Incorrect data parsed, Fields missing or type incorrect")
            }

            let distance  = this.getIndividualCustomerDistance(content)

            content.distance = distance
            that.data.push(content)
        })

        readFileLine.on('close', () => {
            this.emit('ready')
        })
    }


    /*
        getCustomerWithinDistance returns a sorted list of customers names and ids
        arguments :-
            threshold - max distance

        complexity :- nlog(n)
     */
    getCustomersWithinDistance(threshold) {
        if (this.data.length == 0) {
            throw new Error("Data not yet loaded")
            return
        }

        let customers = []
        for (let i = 0; i < this.data.length ; i++) {
            if (this.data[i].distance <= threshold) {
                customers.push({
                    name : this.data[i].name,
                    user_id : this.data[i].user_id
                })
            }
        }

        return customers.sort((a, b) => {
            return a.user_id - b.user_id
        })
    }


    /*
        getIndividualCustomerDistance Pre-computes the distance of a customer from Intercom
        arguments :-
            data - Contains the latitude, longitude, name and user_id

     */
    getIndividualCustomerDistance(data) {
        let latitudeInRadians = utils.convertDegreesToRadians(data.latitude)
        let longitudeInRadians = utils.convertDegreesToRadians(data.longitude)
        let distance = utils.calculateGreatCircleDistance(
            this.intercomLatitudeInRadians,
            latitudeInRadians,
            this.intercomLongitudeInRadians,
            longitudeInRadians
        )
        return distance
    }
}

module.exports = CustomerDataModel