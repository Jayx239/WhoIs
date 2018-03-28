var baseScraper = require('../scraper/base');
var rp = baseScraper.requestPromise;
var cheerio = baseScraper.cheerio;
var homePage = "https://www.whitepages.com/";
var baseUrl = "https://www.whitepages.com/search/ReversePhone/";

function WhitePagesParser(){
    this.homePage = "https://www.whitepages.com/";
    this.baseUrl = "https://www.whitepages.com/phone/";
}

WhitePagesParser.prototype.parse = function(searchDetails, callback) {

    const baseOptions = {
        uri: homePage,
        simple: false,
        transform: function (body) {
            //console.log(body);
            return body;
        }
    };


    rp(baseOptions)
        .then(function(body) {

    const options = {
        uri: baseUrl + searchDetails.phoneNumber,
        simple: false,
        transform: function (body) {
            //console.log(body);
            return body;
        }
    };


    rp(options)
        .then(function (body) {
            console.log(body);
            const $ = cheerio.load(body);
            var OwnerFullName = $('h2.owner-name').text();
            var OwnerAge = $('h2.owner-name').siblings().eq(1).text();
            var Family = {};

            $('#associated > li').each(function(i, elem){
                var name = $(this).children(' a > p.assoicated-link-title').text();
                var age = $(this).children(' a > p.grey-subtext').text();
                family.push({
                    name: name,
                    age: age
                });
            });

            callback({
                OwnerFullName: OwnerFullName,
                OwnerAge: OwnerAge,
                Family: Family
            })
    })
        .catch(function (err) {
            console.log("Error -1-1-1-1");
            parseBody(err.error,callback);
            callback(err);
        })
    })
    .catch(function (err) {
        callback(err);
    })
};


function parseBody(body, callback) {
    console.log(body);
    const $ = cheerio.load(body);
    var OwnerFullName = $('h2.owner-name').text();
    var OwnerAge = $('h2.owner-name').siblings().eq(1).text();
    var Family = {};

    $('#associated > li').each(function(i, elem){
        var name = $(this).children(' a > p.assoicated-link-title').text();
        var age = $(this).children(' a > p.grey-subtext').text();
        family.push({
            name: name,
            age: age
        });
    });

    callback({
        OwnerFullName: OwnerFullName,
        OwnerAge: OwnerAge,
        Family: Family
    })
}

module.exports = {
    WhitePagesParser: WhitePagesParser
};