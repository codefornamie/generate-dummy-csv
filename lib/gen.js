"use strict";

//var fs = require("fs");
//var path = require("path");
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var CSV = require("comma-separated-values");
//var src = fs.readFileSync(path.join(__dirname, "../data/template.csv")).toString();
//var csv = new CSV(src, { header : true }).parse();

/**
 * DummyHoribaGenerator
 *
 * @class
 * @param {Object} opt
 */
function DummyHoribaGenerator(opt) {
    opt = opt || {};

    this.headerFactor = opt.headerFactor || 1;
    this.dateFactor = opt.dateFactor || 1;
    this.doseFactor = opt.doseFactor || 1;
    this.positionFactor = opt.positionFactor || 1;
    this.altitudeFactor = opt.altitudeFactor || 1;
    this.recordFactor = opt.recordFactor || 3;
    //this.threadFactor = opt.threadFactor || 1;
}

/**
 * generateDummyHoriba
 *
 * @return {String}
 */
DummyHoribaGenerator.prototype.generateDummyHoriba = function () {
    // header
    // TODO
    var header = ["Date/Time", "Dose equivalent rate (uSv/h)", "Position", "Altitude(m)"];

    // date
    var dateStr;
    switch (this.dateFactor) {
        case 1:
            var m = moment();
            m.add(-Math.random() * 365, "days");
            dateStr = m.format("YYYY-MM-DDTHH:mm:ss");
            break;

        case 2:
            dateStr = "INVALID";
            break;

        case 3:
            dateStr = "";
            break;
    }

    // record
    var record;
    switch (this.recordFactor) {
        case 1:
            record = 0;
            break;

        case 2:
            record = Math.floor(Math.random() * 100);
            break;

        case 3:
            record = 1000;
            break;
    }

    var csv = [];
    csv.push(header);
    while (record--) {
        var row = [];

        // dose
        var dose;
        switch (this.doseFactor) {
            case 1:
                dose = ~~(Math.random() * 20000) / 1000;
                break;

            case 2:
                dose = "INVALID";
                break;

            case 3:
                dose = "";
                break;
        }

        // position
        var latBase = 35.5063684;
        var lngBase = 139.6146785;
        var lat, lng;
        var position;
        switch (this.positionFactor) {
            case 1:
                lat = latBase + Math.random() * 0.1;
                lng = lngBase + Math.random() * 0.1;
                position = lat + " " + lng;
                break;

            case 2:
                position = "";
                break;
        }

        // altitude
        var altitudeBase = 70;
        var altitude;
        switch (this.altitudeFactor) {
            case 1:
                altitude = altitudeBase + Math.random() * 10;
                break;

            case 2:
                altitude = "INVALID";
                break;

            case 3:
                altitude = "";
                break;
        }

        // Date/Time,Dose equivalent rate (uSv/h),Position,Altitude(m)
        row = [dateStr, dose, position, altitude];
        //row["Date/Time"] = dateStr;
        //row["Dose equivalent rate (uSv/h)"] = dose;
        //row["Position"] = position;
        //row["Altitude(m)"] = altitude;

        csv.push(row);
    }

    var generated = new CSV(csv, { header : false, lineDelimiter : "\n" }).encode();

    generated = generated.replace(/"/g, "");

    return generated;
};

module.exports = DummyHoribaGenerator;
