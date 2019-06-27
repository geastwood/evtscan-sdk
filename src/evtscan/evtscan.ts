import ApiCaller from './instance/apicaller';
import Pager from './instance/pager';
import * as Types from './instance/types';
import * as Classes from './instance/classes';

import Shared from './shared';

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

    constructor(config: EvtScanConfig, defaultParams?: EvtScanParams) {

        if (config.entrypoint) this.entrypoint = config.entrypoint;
        if (config.timeout) this.timeout = config.timeout;
        if (config.debug) this.debug = config.debug;
        if (defaultParams) this.defaultParams = defaultParams;

        this.apiCaller = Shared.apiCaller = new ApiCaller(this.entrypoint, this.timeout);

    }

    get request () {
        return this.apiCaller ? this.apiCaller.request : undefined;
    }

    // Build recent request session
    block = this.buildRequest.bind(this,'Block');
    transaction = this.buildRequest.bind(this, 'Transaction');
    fungible = this.buildRequest.bind(this, 'Fungible');
    group = this.buildRequest.bind(this, 'Group');
    domain = this.buildRequest.bind(this, 'Domain');
    nonfungible = this.buildRequest.bind(this, 'Nonfungible');
    everipay = this.buildRequest.bind(this, 'Everipay');
    everipass = this.buildRequest.bind(this, 'Everipass');
    buildRequest(type: string, config: any) {
        const recent = EvtScan.R.Recent as any;
        const detail = EvtScan.R.Detail as any;
        const uri: string = recent[type];
        if (uri) {
            if (!config || typeof config === 'object') {
                return new Pager(uri, config, null, this.apiCaller);
            } else {
                // get Detail
            }
            
        } else {
            throw Error('The API Entrypoint is not recognized.');
        }
    }

    /**
     * Get/Search evtAddress
     */
    searchAddress(addr: string) {
        return new Pager(EvtScan.R.General.Address, {
            keyword: addr,
            formatter: (_: Pager, data: string) => {
                return this.address({
                    address: data
                } as Types.EvtAddress);
            }
        }, null, this.apiCaller);
    }
    address(addr: Types.EvtAddress) {
        return new Classes.EvtAddress(addr, this.apiCaller);
    }

}