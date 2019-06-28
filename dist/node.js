"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var node_fetch_1 = require("node-fetch");
main_1.ApiCaller.Config.fetch = node_fetch_1.default;
__export(require("./main"));
