"use strict";

var fs = require("fs");
var path = require("path");
var sprintf = require("sprintf").sprintf;
var Combinatorics = require("js-combinatorics").Combinatorics;
var DummyHoribaGenerator = require("./lib/gen");

var cmb = Combinatorics.cartesianProduct(
    // date
    [1, 2, 3],

    // dose
    [1, 2, 3],

    // position
    [1, 2],

    // altitude
    [1, 2, 3],

    // record
    [1, 2, 3]
);

cmb.forEach(function (a) {
    var filename = sprintf("factor-B1-C1-D%s-E%s-F%s-G%s-H%s.csv", a[0], a[1], a[2], a[3], a[4]);
    var opt = {
        dateFactor: a[0],
        doseFactor: a[1],
        positionFactor: a[2],
        altitudeFactor: a[3],
        recordFactor: a[4]
    };
    var dummyHoribaGenerator = new DummyHoribaGenerator(opt);
    var str = dummyHoribaGenerator.generateDummyHoriba();

    fs.writeFileSync(path.join(__dirname, "factors", filename), str);
});
