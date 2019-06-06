import Axios from 'axios';

export default class ApiCaller {

    private entrypoint: String = "https://evtscan.io";
    private timeout: Number = 3000;

    constructor(entrypoint: String, timeout: Number) {

        if (entrypoint) this.entrypoint = entrypoint;
        if (timeout) this.timeout = timeout;

    }

}