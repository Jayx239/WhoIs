var requestPromise = require('request-promise');
var cheerio = require('cheerio');

function SearchDetails(phoneNumber) {
    this.phoneNumber = phoneNumber;
}


module.exports = {
    requestPromise: requestPromise,
    cheerio: cheerio,
    SearchDetails: SearchDetails
};