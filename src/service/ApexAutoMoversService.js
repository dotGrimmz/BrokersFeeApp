import axios from "axios";



class ApexAutoMoversService {
    constructor(params) {
        if (params) {
            this.instance = axios.create({
                timeout: params.timeout ? params.timeout : 10000,
                headers: params.headers
                    ? params.headers
                    : {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
            });
        } else this.instance = axios;
    }

    fetchLogin(params, body) {

        console.log(params)
        return this.instance.post('https://bfaapi.herokuapp.com/login', body, params)
    }

    postFee(params, body) {
        return this.instance.post('https://bfaapi.herokuapp.com/create', body, params);
    }

    getAllBFAs(params) {
        return this.instance.get('https://bfaapi.herokuapp.com/pending', params)
    }

    updateBFA(params, id, body) {
        return this.instance.put(`https://bfaapi.herokuapp.com/bfaview/${id}`, body, params);
    }

    fetchBrokerFee(params, id) {
        return this.instance.get(`https://bfaapi.herokuapp.com/bfaview/${id}`, params);
    }

    getCarriers(params) {
        return this.instance.get('https://bfaapi.herokuapp.com/carrier', params);
    }

    deleteCarrier(params, id) {
        return this.instance.delete(`https://bfaapi.herokuapp.com/carrier/${id}`, params);
    }

    createCarrier(params, body) {
        return this.instance.post('https://bfaapi.herokuapp.com/carrier', body, params);
    }

    getVehMake(year) {
        return this.instance.get(`https://done.ship.cars/makes/?year=${year}`)
    }

    getVehModel(year, make) {
        return this.instance.get(`https://done.ship.cars/models/?year=${year}&make=${make}`)
    }

    createNewUser(params, body) {
        return this.instance.post('https://bfaapi.herokuapp.com/admin', body, params)
    }

    getAllUserProfiles(params) {
        return this.instance.get('https://bfaapi.herokuapp.com/admin/profiles', params);
    }

    deleteUserProfile(params, id) {
        return this.instance.delete(`https://bfaapi.herokuapp.com/admin/${id}`, params);
    }

    updateUserProfile(params, id, body) {
        return this.instance.put(`https://bfaapi.herokuapp.com/admin/${id}`, body, params);
    }
}

export default ApexAutoMoversService;