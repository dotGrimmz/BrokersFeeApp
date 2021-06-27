import axios from "axios";



class ApexAutoMoversService {
    constructor(params) {
        if (!params) {
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
        return this.instance.post('https://git.heroku.com/bfaapi.git/apexautomovers/login', body, params)
    }

    postFee(params, body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/apexautomovers/create', body, params);
    }

    getAllBFAs(params) {
        return this.instance.get('https://git.heroku.com/bfaapi.git/apexautomovers/pending', params)
    }

    updateBFA(params, id, body) {
        return this.instance.put(`https://git.heroku.com/bfaapi.git/apexautomovers/bfaview/${id}`, body, params);
    }

    fetchBrokerFee(params, id) {
        return this.instance.get(`https://git.heroku.com/bfaapi.git/apexautomovers/bfaview/${id}`, params);
    }

    getCarriers(params) {
        return this.instance.get('https://git.heroku.com/bfaapi.git/apexautomovers/carrier', params);
    }

    deleteCarrier(params, id) {
        return this.instance.delete(`https://git.heroku.com/bfaapi.git/apexautomovers/carrier/${id}`, params);
    }

    createCarrier(params, body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/apexautomovers/carrier', body, params);
    }

    getVehMake(year) {
        return this.instance.get(`https://done.ship.cars/makes/?year=${year}`)
    }

    getVehModel(year, make) {
        return this.instance.get(`https://done.ship.cars/models/?year=${year}&make=${make}`)
    }

    createNewUser(params, body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/apexautomovers/admin', body, params)
    }

    getAllUserProfiles(params) {
        return this.instance.get('https://git.heroku.com/bfaapi.git/apexautomovers/admin/profiles', params);
    }

    deleteUserProfile(params, id) {
        return this.instance.delete(`https://git.heroku.com/bfaapi.git/apexautomovers/admin/${id}`, params);
    }

    updateUserProfile(params, id, body) {
        return this.instance.put(`https://git.heroku.com/bfaapi.git/apexautomovers/admin/${id}`, body, params);
    }
}

export default ApexAutoMoversService;