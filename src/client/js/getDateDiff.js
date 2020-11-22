//This function is taken from https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
const moment = require('moment')
function interval(date1, date2) {
    const tripStart = moment(date1)
    const tripEnd = moment(date2)
    const tripDuration = tripEnd.diff(tripStart,'days')
    return tripDuration;
}


export { interval }