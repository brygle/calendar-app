const moment = require("moment/moment");

const isDate = (value) => {
    if (value === null) {
        return false;
    }

    const date = moment(value);
    if (date.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isDate };