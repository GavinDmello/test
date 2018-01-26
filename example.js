let TestModule = require('./index')
let test = new TestModule({
    dataPath : './data.txt'
})
test.loadCustomerData()
test.on('ready', () => {
    console.log(test.getCustomersWithinDistance(100))
})