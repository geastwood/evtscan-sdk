import * as Types from './types';
import Shared from '../shared';
import ApiCaller from './apicaller';
import EvtScan from '../evtscan';
import Pager from './pager';

class Base<T=any> {

    protected _raw: T | any;
    protected apiCaller: ApiCaller;

    constructor(data: any, apiCaller?: ApiCaller) {
        this._raw = data;
        this.apiCaller = apiCaller || Shared.apiCaller;
        this.init();
    }

    protected init() {}
    async update(params?: any): Promise<T | void> {}

}

export class EvtAddress extends Base<Types.EvtAddress> {

    public address: string;
    public stats: any = {};
    public assets: any = [];
    public history: Pager = null;

    init() {
        this.address = this._raw.address;
    }

    async update(address?: string) {
        if (address) {
            this.address = address;
            this._raw = { address } as Types.EvtAddress;
        }
        this.stats = await this.apiCaller.request(EvtScan.R.Detail.Address, null, this.address);
        this.assets = await this.apiCaller.request(EvtScan.R.Detail.AddressAssets, null, this.address);
        this.history = new Pager(EvtScan.R.Detail.AddressHistory, {}, this.address, this.apiCaller);
        return this;
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

    async update(id?: string) {
        if (id) {
            this._raw = await this.apiCaller.request(EvtScan.R.Detail.Block, null, id);
            this.init();
        }
        return this;
    }

    async prev() {
        return this._prev = new Block(await this.apiCaller.request(EvtScan.R.Detail.Block, null, this.prevId));
    }

}

export class Transaction extends Base<any> {

    public id: string;
    public sequenceNum: number;
    public blockNum: number;
    public actionCount: number;
    public timestamp: Date;
    public expiration: Date;
    public maxCharge: number;
    public pending: boolean;
    public type: string;
    public status: string;
    public signatures: string[];
    public keys: Types.EvtAddress[];
    public elapsed: number;
    public charge: number;
    public suspend: string | null;
    public created: Date;

    public blockId: string;
    public payer: Types.EvtAddress;

    private _block: Block;
    private _payer: EvtAddress;

    init() {
        this.id = this._raw.trx_id;
        this.sequenceNum = this._raw.seq_num;
        this.blockNum = this._raw.block_num;
        this.actionCount = this._raw.action_count;
        this.maxCharge = this._raw.max_charge;
        this.pending = this._raw.pending;
        this.type = this._raw.type;
        this.status = this._raw.status;
        this.signatures = this._raw.signatures || [];
        this.keys = this._raw.keys.map((address: string) => ({
            address
        } as Types.EvtAddress));
        this.elapsed = this._raw.elapsed;
        this.charge = this._raw.charge;
        this.suspend = this._raw.suspend_name;
        this.timestamp = new Date(this._raw.timestamp);
        this.created = new Date(this._raw.created_at);
        this.expiration = new Date(this._raw.expiration);

        this.blockId = this._raw.block_id;
        this.payer = {
            address: this._raw.pager
        } as Types.EvtAddress;
    }

    async update(id?: string) {
        if (id) {
            this._raw = await this.apiCaller.request(EvtScan.R.Detail.Transaction, null, id);
            this.init();
        }
        return this;
    }

    public async getPayer() {
        this._payer = new EvtAddress(this.payer, this.apiCaller);
        await this._payer.update();
        return this._payer;
    }

    public async getBlock() {
        return this._block = new Block(await this.apiCaller.request(EvtScan.R.Detail.Block, null, this.blockId));
    }

}

export class Everipay extends Transaction {}
export class Everipass extends Transaction {}

export class Fungible extends Base<any> {

    public name: string;
    public symName: string;
    public symId: number;
    public precision: number;
    public total: number;
    public current: number;
    public timestamp: Date;
    public created: Date;

    public metas: any[];
    public issue: any;
    public transfer: any;
    public manage: any;

    public creator: Types.EvtAddress;
    public trxId: string;

    private _creator: EvtAddress;
    private _trx: Transaction;

    init() {
        this.name = this._raw.name;
        this.symName = this._raw.sym_name;
        this.symId = this._raw.sym_id;
        this.precision = parseInt(this._raw.sym.split(",")[0], 10) || 5;
        this.total = this._raw.total_supply;
        this.current = typeof this._raw.current_supply === 'undefined' ? -1 : this._raw.current_supply;

        this.metas = this._raw.metas;
        this.issue = this._raw.issue;
        this.transfer = this._raw.transfer;
        this.manage = this._raw.manage;
        
        this.timestamp = new Date(this._raw.timestamp);
        this.created = new Date(this._raw.created_at);

        this.creator = {
            address: this._raw.pager
        } as Types.EvtAddress;
        this.trxId = this._raw.trx_id;
    }

    async update(id?: string) {
        if (id) {
            this._raw = await this.apiCaller.request(EvtScan.R.Detail.Fungible, null, id);
            this.init();
        }
        return this;
    }

    public get sym() { return `${this.precision},S#${this.symId}`; }

    public async getTransaction() {
        return this._trx = new Transaction(await this.apiCaller.request(EvtScan.R.Detail.Block, null, this.trxId));
    }

    public async getCreator() {
        this._creator = new EvtAddress(this.creator, this.apiCaller);
        await this._creator.update();
        return this._creator;
    }

}