import ApiCaller from './apicaller';

export interface EvtScanConfig {
    entrypoint?: string;
    timeout?: number;
    debug?: boolean;
}

export interface EvtScanParams {
    since?: string;
    from?: string;
    page?: number;
    size?: number;
}

export default class EvtScan {

    private entrypoint: string = "https://evtscan.io/api";
    private timeout: number = 3000;
    private debug: boolean = false;
    private apiCaller: ApiCaller;
    
    private defaultParams: EvtScanParams;
    
    public static R = {
        General: {
            System: '/',
            SysInfo: '/info',
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

    async request(uri: string, params?: EvtScanParams) {
        const res = await this.apiCaller.get(uri, params);
        if (res.data && res.status) {
            return res.data;
        }
        return res;
    }

}