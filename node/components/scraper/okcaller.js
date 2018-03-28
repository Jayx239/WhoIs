var baseScraper = require('../scraper/base');
var rp = baseScraper.requestPromise;
var cheerio = baseScraper.cheerio;
var homePage = "https://www.whitepages.com/";
var baseUrl = "http://www.okcaller.com/detail.php?number=";

function OkCallerParser(){
    this.homePage = "https://www.whitepages.com/";
    this.baseUrl = "http://www.okcaller.com/detail.php?number=";
}

OkCallerParser.prototype.parse = function(searchDetails, callback) {

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

            const $ = cheerio.load(body);
            var people = [];
            $("#example-stats tbody").find('tr').each(function(i, elem){
                var phoneNumber = $(elem).children('td').eq(0).children('a').text();
                //console.log(phoneNumber);
                //if(phoneNumber === searchDetails.phoneNumber) {

                    var name = $(elem).children('td').eq(1).text();
                //console.log(name);
                    var addressLine1 = $(elem).children('td').eq(2).text();
                //console.log(addressLine1);
                    var addressLine2 = $(elem).children('td').eq(3).text();
                //console.log(addressLine2);
                    var addressLine3 = $(elem).children('td').eq(4).text();
                //console.log(addressLine3);
                    var addressLine4 = $(elem).children('td').eq(5).text();
                //console.log(addressLine4);

                    people.push({
                        phoneNumber: phoneNumber,
                        name: name,
                        address: {
                            line1: addressLine1,
                            line2: addressLine2,
                            line3: addressLine3,
                            line4: addressLine4
                        }

                    });
                //}
            });

            callback(people);
    })
        .catch(function (err) {
            console.log("Error -1-1-1-1");
            parseBody(err.error,callback);
            callback(err);
        })

};


function parseBody(body, callback) {

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
    OkCallerParser: OkCallerParser
};