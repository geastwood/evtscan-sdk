"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Package = require("./main");
var EvtScan = Package.EvtScan;
Object.keys(Package)
    .filter(function (k) { return k !== 'EvtScan' && k !== 'default'; })
    .forEach(function (k) {
    EvtScan[k] = Package[k];
});
exports.default = EvtScan;
