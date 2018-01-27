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
- `loadCustomerData(path)`
  
  Loads the customer data from the path given in the customer or the path given in the argument

- `getCustomersWithinDistance(threshold)`

  Gets all the names and userids of customers within a given range


## Events
- `ready`
    
  Fired when the data has been loaded into memory
  
## Tests
- `npm test`
 
