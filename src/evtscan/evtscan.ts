import ApiCaller from './apicaller';

export interface EvtScanConfig {
    entrypoint?: String;
    timeout?: Number;
    debug?: Boolean;
}

export default class EvtScan {

    private entrypoint: String = "https://evtscan.io";
    private timeout: Number = 3000;
    private debug: Boolean = false;
    private apiCaller: ApiCaller;

    constructor(config: EvtScanConfig) {

        if (config.entrypoint) this.entrypoint = config.entrypoint;
        if (config.timeout) this.timeout = config.timeout;
        if (config.debug) this.debug = config.debug;

        this.apiCaller = new ApiCaller(this.entrypoint, this.timeout);

    }

}