"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var apicaller_1 = require("./instance/apicaller");
var pager_1 = require("./instance/pager");
var Classes = require("./instance/classes");
var shared_1 = require("./shared");
var EvtScan = /** @class */ (function () {
    function EvtScan(config, defaultParams) {
        if (config === void 0) { config = {}; }
        this.debug = false;
        // Build recent request session
        this.block = this.buildRequest.bind(this, 'Block');
        this.transaction = this.buildRequest.bind(this, 'Transaction');
        this.fungible = this.buildRequest.bind(this, 'Fungible');
        this.group = this.buildRequest.bind(this, 'Group');
        this.domain = this.buildRequest.bind(this, 'Domain');
        this.nonfungible = this.buildRequest.bind(this, 'Nonfungible');
        this.everipay = this.buildRequest.bind(this, 'Everipay');
        this.everipass = this.buildRequest.bind(this, 'Everipass');
        if (config.apiCaller && config.apiCaller instanceof apicaller_1.default) {
            this.apiCaller = shared_1.default.apiCaller = config.apiCaller;
        }
        else {
            this.apiCaller = shared_1.default.apiCaller = new apicaller_1.default(config.endpoint || null);
        }
        if (config.debug)
            this.debug = config.debug;
        if (defaultParams)
            this.defaultParams = defaultParams;
    }
    Object.defineProperty(EvtScan.prototype, "request", {
        get: function () {
            return this.apiCaller ? this.apiCaller.request : undefined;
        },
        enumerable: true,
        configurable: true
    });
    EvtScan.prototype.buildRequest = function (type, config) {
        var recent = EvtScan.R.Recent;
        var detail = EvtScan.R.Detail;
        var uri = recent[type];
        if (uri) {
            if (!config || typeof config === 'object') {
                return new pager_1.default(uri, __assign({}, config, { formatter: function (_, data) {
                        var c = Classes[type];
                        if (c) {
                            return new c(data, _.apiCaller);
                        }
                        else {
                            return data;
                        }
                    } }), null, this.apiCaller);
            }
            else {
                // get Detail
            }
        }
        else {
            throw Error('The API Entrypoint is not recognized.');
        }
    };
    /**
     * Get/Search evtAddress
     */
    EvtScan.prototype.searchAddress = function (addr) {
        var _this = this;
        return new pager_1.default(EvtScan.R.General.Address, {
            keyword: addr,
            formatter: function (_, data) {
                return _this.address({
                    address: data
                });
            }
        }, null, this.apiCaller);
    };
    EvtScan.prototype.address = function (addr) {
        return new Classes.EvtAddress(addr, this.apiCaller);
    };
    EvtScan.R = {
        General: {
            System: '/',
            SysInfo: '/info',
            ChainInfo: '/chaininfo',
            Address: '/searchAddress'
        },
        Recent: {
            Block: '/block',
            Transaction: '/transaction',
            Everipay: '/everipay',
            Everipass: '/everipass',
            Action: '/action',
            Fungible: '/fungible',
            Domain: '/domain',
            Group: '/group',
            Nonfungible: '/nonfungible'
        },
        Detail: {
            Block: '/block/%%',
            Transaction: '/transaction/%%',
            Fungible: '/fungible/%%',
            Domain: '/domain/%%',
            Group: '/group/%%',
            Nonfungible: '/nonfungible/%%',
            Address: '/address/%%',
            AddressAssets: '/addressAssets/%%',
            AddressHistory: '/addressHistory/%%'
        }
    };
    EvtScan.new = function (config) { return new EvtScan(config || {}); };
    return EvtScan;
}());
exports.default = EvtScan;
