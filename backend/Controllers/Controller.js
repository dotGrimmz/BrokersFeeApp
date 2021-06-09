const router = require("express").Router();
const AAMService = require("../Service/AAMService");

const service = new AAMService();



router.route("/login").post((req, res) => {
    return service.authenticateUser(req, res)
});

router.route("/create").post((req, res) => {
    return service.createBrokerFee(req, res)

});

router.route("/pending").get((req, res) => {
    return service.getAllBrokerFees(req, res)
});


router.route("/bfaview/:id").put((req, res) => {
    return service.updateBrokerFee(req, res)
});

router.route("/bfaview/:id").get((req, res) => {
    return service.fetchBrokerFee(req, res);
});


router.route("/carrier").post((req, res) => {
    console.log(req.body, 'req body in controller')
    return service.createCarrier(req, res);
});

router.route("/carrier/:id").delete((req, res) => {
    return service.deleteCarrier(req, res)
})

router.route("/carrier").get((req, res) => {
    return service.getAllCarriers(req, res)
})
module.exports = router;
