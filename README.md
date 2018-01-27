# test

## Usage
```js
  let TestModule = require('./index')
  let test = new TestModule({
    dataPath : './data.txt'
  })
  test.loadCustomerData()
  test.on('ready', () => {
    console.log(test.getCustomersWithinDistance(100))
  })

```

## Functions
The constructor takes in an object which contains the  dataPath and the co-ordinates (optional)

- `loadCustomerData(path)`
  
  Loads the customer data from the path given or switches to the dataPath from the constructor

- `getCustomersWithinDistance(threshold)`

  Gets all the names and userids of customers within a given range



## Events
- `ready`
    
  Fired when the data has been loaded into memory
  
## Tests
- `npm test`
 
## Environment
- node 6.9.1 and versions and above
