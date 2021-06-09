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
        return this.instance.post('http://localhost:5000/apexautomovers/login', body)
    }

    postFee(body) {
        return this.instance.post('http://localhost:5000/apexautomovers/create', body);
    }

    getAllBFAs() {
        return this.instance.get('http://localhost:5000/apexautomovers/pending')
    }

    updateBFA(id, body) {
        return this.instance.put(`http://localhost:5000/apexautomovers/bfaview/${id}`, body);
    }

    fetchBrokerFee(id) {
        return this.instance.get(`http://localhost:5000/apexautomovers/bfaview/${id}`);
    }

    getCarriers() {
        return this.instance.get('http://localhost:5000/apexautomovers/carrier');
    }

    deleteCarrier(id) {
        console.log(id, 'id from the controller')
        return this.instance.delete(`http://localhost:5000/apexautomovers/carrier/${id}`);
    }

    createCarrier(body) {
        return this.instance.post('http://localhost:5000/apexautomovers/carrier', body);
    }

    getVehMake(year) {
        return this.instance.get(`https://done.ship.cars/makes/?year=${year}`)
    }

    getVehModel(year, make) {
        return this.instance.get(`https://done.ship.cars/models/?year=${year}&make=${make}`)
    }
}

export default ApexAutoMoversService;