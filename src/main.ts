import EvtScan, { EvtScanConfig } from './evtscan/evtscan';
import ApiCaller from './evtscan/apicaller';

export default {
    
    new: (config?: EvtScanConfig) => new EvtScan(config || {}),

    EvtScan: EvtScan,
    ApiCaller: ApiCaller

};