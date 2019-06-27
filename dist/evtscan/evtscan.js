"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apicaller_1 = require("./instance/apicaller");
var pager_1 = require("./instance/pager");
var EvtScan = /** @class */ (function () {
    function EvtScan(config, defaultParams) {
        this.entrypoint = "https://evtscan.io/api";
        this.timeout = 3000;
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
        if (config.entrypoint)
            this.entrypoint = config.entrypoint;
        if (config.timeout)
            this.timeout = config.timeout;
        if (config.debug)
            this.debug = config.debug;
        if (defaultParams)
            this.defaultParams = defaultParams;
        this.apiCaller = new apicaller_1.default(this.entrypoint, this.timeout);
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
                return new pager_1.default(uri, config);
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
        return new pager_1.default(EvtScan.R.General.Address, {
            keyword: addr
        });
    };
    EvtScan.prototype.address = function (addr) {
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
    return EvtScan;
}());
exports.default = EvtScan;
