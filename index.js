"use strict";

var DummyHoribaGenerator = require("./lib/gen");
var opt = {};
var dummyHoribaGenerator = new DummyHoribaGenerator(opt);
var str = dummyHoribaGenerator.generateDummyHoriba();

console.log(str);
