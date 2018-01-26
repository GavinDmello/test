let DataModel = require('./index')
let dataModel = new DataModel({
    dataPath : './data.txt'
})
dataModel.loadCustomerData()
dataModel.on('ready', () => {
    console.log(dataModel.getCustomersWithinDistance(100))
})