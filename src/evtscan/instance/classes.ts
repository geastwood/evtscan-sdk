import * as Types from './types';
import Shared from '../shared';
import ApiCaller from './apicaller';
import EvtScan from '../evtscan';
import Pager from './pager';

class Base<T=any> {

    protected readonly _raw: T | any;
    protected apiCaller: ApiCaller;

    constructor(data: any, apiCaller?: ApiCaller) {
        this._raw = data;
        this.apiCaller = apiCaller || Shared.apiCaller;
        this.init();
    }

    protected init() {}
    async update() {}

}

export class EvtAddress extends Base<Types.EvtAddress> {

    public address: string;
    public stats: any = {};
    public assets: any = [];
    public history: Pager = null;

    init() {
        this.address = this._raw.address;
    }

    async update() {
        this.stats = await this.apiCaller.request(EvtScan.R.Detail.Address, null, this.address);
        this.assets = await this.apiCaller.request(EvtScan.R.Detail.AddressAssets, null, this.address);
        this.history = new Pager(EvtScan.R.Detail.AddressHistory, {}, this.address, this.apiCaller);
    }

}

export class Block extends Base<any> {

    public id: string;
    public num: number;
    public root: string;
    public trxCount: number;
    public producer: string;
    public pending: boolean;
    public timestamp: Date;
    public created: Date;
    public prevId: string;

    private _prev: Block;

    init() {
        this.id = this._raw.block_id;
        this.num = this._raw.block_num;
        this.root = this._raw.trx_merkle_root;
        this.trxCount = this._raw.trx_count;
        this.producer = this._raw.producer;
        this.pending = this._raw.pending;
        this.timestamp = new Date(this._raw.timestamp);
        this.created = new Date(this._raw.created_at);
        this.prevId = this._raw.prev_block_id;
    }

    async prev() {
        return this._prev = new Block(await this.apiCaller.request(EvtScan.R.Detail.Block, null, this.prevId));
    }

}