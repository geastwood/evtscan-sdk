import ApiCaller from './apicaller';

export interface PagerConfig {
    since?: string;
    from?: string;
    page?: number;
    size?: number;
}

export default class Pager {

    public pageSize: number = 20;
    public pageOffset: number = -1;
    public pageData: any = [];
    public data: any;

    public readonly uri: string;
    public readonly key: string;

    private apiCaller: ApiCaller;
    
    public constructor(uri:string, config?: PagerConfig, key?: string, apiCaller?: ApiCaller) {
        this.uri = uri;
        if (key) this.key = key;
        if (apiCaller) {
            this.apiCaller = apiCaller;
        } else {
            this.apiCaller = new ApiCaller();
        }
        if (!config) return;
        if (config.page) this.pageOffset = config.page - 1;
        if (config.size) this.pageSize = config.size;
    }

    private async getPageData() {
        if (this.pageData[this.pageOffset]) {
            return this.pageData[this.pageOffset];
        }
        this.pageData[this.pageOffset]
            = await this.apiCaller.request(this.uri, {
                page: this.pageOffset,
                size: this.pageSize
            }, this.key || '');
        return this.data;
    }

    public async prev() {
        return await this.page(this.pageOffset - 1);
    }

    public async next() {
        return await this.page(this.pageOffset + 1);
    }

    public async page(p: number) {
        if (p < 0 || parseInt(`${p}`, 10) !== p) {
            p = this.pageOffset;
        }
        this.pageOffset = p;
        return this.data = (await this.getPageData());
    }

}