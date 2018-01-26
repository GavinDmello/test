let DataModel = require('./index')
let dataModel = new DataModel({
    dataPath : './data.txt'
})
dataModel.loadCustomerData('../da')
dataModel.on('ready', () => {
    console.log(dataModel.getCustomerWithinDistance(100))
})