class Validator {

    /*
        validateCustomerData  validates customer data for presence and type
        arguments :-
            date - object - should contain name, latitude, longitude, user_id
     */
    validateCustomerData(data) {
        if (!data.name || !data.latitude || !data.longitude || !data.user_id) {
            return false
        }

        if (typeof data.name !== 'string') {
            return false
        }

        if (typeof data.latitude !== 'number') {
            return false
        }

        if (typeof data.longitude !== 'number') {
            return false
        }

        if (typeof  data.user_id !== 'number') {
            return false
        }

        return true
    }
}

module.exports = Validator