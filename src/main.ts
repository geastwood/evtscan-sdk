import EvtScan, { EvtScanConfig } from './evtscan/evtscan';
import ApiCaller from './evtscan/instance/apicaller';

export default {
    
    new: (config?: EvtScanConfig) => new EvtScan(config || {}),

    EvtScan: EvtScan,
    ApiCaller: ApiCaller

};