class Utils {

    constructor() {
        this.radius = 6378.14
    }

    /*
        convertDegreesToRadians Converts degrees to radians
        Argument :-
        Degrees - Data to be converted
     */

    convertDegreesToRadians(degrees) {
        return (degrees * Math.PI) /180
    }

    /*
        calculateDistance Calculates the distance(kms) between two points, using the
        great-circle distance distance formula.
        Arguments :-
        latitude1 - Latitude of location 1 in radians
        latitude2 - Latitude of location 2 in radians
        longitude1 - Longitude of location 1 in radians
        longitude2 - Longitude of location 2 in radians
     */

    calculateGreatCircleDistance(latitude1, latitude2, longitude1, longitude2) {
        let delta = Math.abs(longitude2 - longitude1)
        let cosVal = ((Math.sin(latitude1) * Math.sin(latitude2)) + (Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(delta)))
        let theta = Math.acos(cosVal)

        return theta * this.radius
    }
}

module.exports =  Utils