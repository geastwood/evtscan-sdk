import Axios from 'axios';

export default class ApiCaller {

    private entrypoint: string = "https://evtscan.io/api";
    private timeout: number = 3000;

    constructor(entrypoint?: string, timeout?: number) {

        if (entrypoint) this.entrypoint = entrypoint;
        if (timeout) this.timeout = timeout;

    }
    
    async get(uri: string, params={}, headers={}) {
        return (await Axios.get(this.entrypoint + uri, {
            params,
            headers: {
                'User-Agent': 'EvtScanSDK v1.0',
                ...headers
            },
            timeout: this.timeout
        })).data;
    }

    async request(uri: string, params: any = {}, key: string = "") {
        if (uri.indexOf('%%') !== -1 && key) {
            uri = uri.replace('%%', key);
        }
        const res = await this.get(uri, params);
        if (res.data && (res.state || res.status)) {
            return res.data;
        }
        return res;
    }

}