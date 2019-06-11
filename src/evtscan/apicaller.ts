import Axios from 'axios';

export default class ApiCaller {

    private entrypoint: String = "https://evtscan.io";
    private timeout: Number = 3000;

    constructor(entrypoint: String, timeout: Number) {

        if (entrypoint) this.entrypoint = entrypoint;
        if (timeout) this.timeout = timeout;

    }
    
    async get(uri: String, params={}, headers={}) {
        return Axios.get(this.entrypoint + uri, {
            params,
            headers: {
                'User-Agent': 'EvtScanSDK v1.0',
                ...headers
            },
            timeout: this.timeout
        });
    }

}