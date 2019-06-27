import * as Types from './types';
import Shared from '../shared';
import ApiCaller from './apicaller';
import EvtScan from '../evtscan';
import Pager from './pager';

export class EvtAddress {

    public address: string;
    public stats: any = {};
    public assets: any = [];
    public history: Pager = null;
    
    private apiCaller: ApiCaller;

    constructor(addr: Types.EvtAddress, apiCaller?: ApiCaller) {
        this.address = addr.address;
        this.apiCaller = apiCaller || Shared.apiCaller;
    }

    async update() {
        this.stats = await this.apiCaller.request(EvtScan.R.Detail.Address, null, this.address);
        this.assets = await this.apiCaller.request(EvtScan.R.Detail.AddressAssets, null, this.address);
        this.history = new Pager(EvtScan.R.Detail.AddressHistory, {}, this.address, this.apiCaller);
    }

}