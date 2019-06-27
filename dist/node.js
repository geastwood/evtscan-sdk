"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var node_fetch_1 = require("node-fetch");
main_1.default.ApiCaller.Config.fetch = node_fetch_1.default;
exports.default = main_1.default;
