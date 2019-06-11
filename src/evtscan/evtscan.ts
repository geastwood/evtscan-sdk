import ApiCaller from './apicaller';

export interface EvtScanConfig {
    entrypoint?: String;
    timeout?: Number;
    debug?: Boolean;
}

export interface EvtScanParams {
    since?: String;
    from?: String;
    page?: Number = 0;
    size?: Number = 10;
}

export default class EvtScan {

    private entrypoint: String = "https://evtscan.io";
    private timeout: Number = 3000;
    private debug: Boolean = false;
    private apiCaller: ApiCaller;
    
    private defaultParams: EvtScanParams;
    
    public static R = {
        General: {
            System: '/',
            ChainInfo: '/chaininfo',
            Address: '/searchAddress'
        },
        Recent: {
            Block: '/block',
            Transaction: '/transaction',
            Everipay: ['/trxByName', {trx_name: 'everipay'}],
            Everipass: ['/trxByName', {trx_name: 'everipass'}],
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

    constructor(config: EvtScanConfig, defaultParams?: EvtScanParams) {

        if (config.entrypoint) this.entrypoint = config.entrypoint;
        if (config.timeout) this.timeout = config.timeout;
        if (config.debug) this.debug = config.debug;
        if (defaultParams) this.defaultParams = defaultParams;

        this.apiCaller = new ApiCaller(this.entrypoint, this.timeout);

    }

}