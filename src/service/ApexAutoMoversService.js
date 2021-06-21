import axios from "axios";



class ApexAutoMoversService {
    constructor(params) {
        if (params) {
            this.instance = axios.create({
                headers: params.headers
                    ? params.headers
                    : {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data",
                    },
            });
        } else this.instance = axios;
    }

    fetchLogin(body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/login', body, {})
    }

    postFee(body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/create', body, {});
    }

    getAllBFAs() {
        return this.instance.get('https://git.heroku.com/bfaapi.git/pending', {})
    }

    updateBFA(id, body) {
        return this.instance.put(`https://git.heroku.com/bfaapi.git/bfaview/${id}`, body, {});
    }

    fetchBrokerFee(id) {
        return this.instance.get(`https://git.heroku.com/bfaapi.git/bfaview/${id}`, {});
    }

    getCarriers() {
        return this.instance.get('https://git.heroku.com/bfaapi.git/carrier', {});
    }

    deleteCarrier(id) {
        return this.instance.delete(`https://git.heroku.com/bfaapi.git/carrier/${id}`, {});
    }

    createCarrier(body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/carrier', body), {};
    }

    getVehMake(year) {
        return this.instance.get(`https://done.ship.cars/makes/?year=${year}`, {})
    }

    getVehModel(year, make) {
        return this.instance.get(`https://done.ship.cars/models/?year=${year}&make=${make}`, {})
    }

    createNewUser(body) {
        return this.instance.post('https://git.heroku.com/bfaapi.git/admin', body, {})
    }

    getAllUserProfiles() {
        return this.instance.get('https://git.heroku.com/bfaapi.git/admin/profiles', {});
    }

    deleteUserProfile(id) {
        return this.instance.delete(`https://git.heroku.com/bfaapi.git/admin/${id}`, {});
    }

    updateUserProfile(id, body) {
        return this.instance.put(`https://git.heroku.com/bfaapi.git/admin/${id}`, body, {});
    }
}

export default ApexAutoMoversService;