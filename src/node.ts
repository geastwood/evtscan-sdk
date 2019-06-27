import EvtScan from './main';
import Fetch from 'node-fetch';

EvtScan.ApiCaller.Config.fetch = Fetch;

export default EvtScan;