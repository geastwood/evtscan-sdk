"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var evtscan_1 = require("./evtscan/evtscan");
var apicaller_1 = require("./evtscan/instance/apicaller");
exports.default = {
    new: function (config) { return new evtscan_1.default(config || {}); },
    EvtScan: evtscan_1.default,
    ApiCaller: apicaller_1.default
};
