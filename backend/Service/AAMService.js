const UserDomain = require("../Domains/UserDomain");
const mongoose = require("mongoose");
const BrokerDomain = require("../Domains/BrokerDomain");
const CarrierDomain = require("../Domains/CarrierDomain");




class AAMService {

    authenticateUser(req, res) {
        const userName = req.body.userName;
        const password = req.body.password;
        let validated = false;
        let wrongPassword = false;
        let userId = "";

        UserDomain.find()
            .then((users) => {
                users.forEach((user) => {
                    if (user.userName === userName && user.password === password) {
                        validated = true;
                        userId = user._id;
                        user.password = ''
                        res.status(200).send(user);
                    } else if (user.userName === userName && user.password !== password) {
                        wrongPassword = true;
                    }
                });
            })
            .then(() => {
                if (validated === false) {
                    res.status(400).send({
                        login: false,
                        message: wrongPassword
                            ? "Incorrect Password"
                            : "User Does Not Exist",
                    });
                }
            })
            .catch((err) => {
                res.status(400).json("Error: " + err);
            });
    }

    createBrokerFee(req, res) {
        const newBF = new BrokerDomain(req.body)
        newBF
            .save()
            .then(data => res.json(data))
            .catch((err) => { res.status(400).json('Error' + err) })
    }



    getAllBrokerFees(req, res) {
        BrokerDomain.find()
            .then(brokerfees => {
                let sortedBrokerFees = brokerfees.sort(
                    (a, b) => b.createdAt - a.createdAt
                );
                res.send(sortedBrokerFees)
            })
            .catch((err) => res.status(400).json("Error: " + err));
    }





    updateBrokerFee(req, res) {
        const id = req.params.id;
        BrokerDomain.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
            if (!err) {
                doc.save((err, doc) => {
                    if (!err) {
                        res.send(doc)
                    } else {
                        res.status(400).json("Error: Broker fee did not update" + err)

                    }

                })
            }
            else {
                res.status(400).json("Error: Broker fee did not update" + err)
            }
        })
            .catch((err) =>
                res.status(400).json("Error: Broker fee did not update" + err)
            );
    }


    fetchBrokerFee(req, res) {
        const id = req.params.id;
        BrokerDomain.findById(id)
            .then(brokerFee => {
                res.status(200).send(brokerFee)
            })
            .catch((err) =>
                res.status(400).json("Error: Broker fee did not fetch" + err)
            );
    }

    getAllCarriers(req, res) {
        CarrierDomain.find()
            .then(carriers => {
                let sortedCarriers = carriers.sort(
                    (a, b) => b.name - a.name
                );
                res.send(sortedCarriers)
            })
            .catch((err) => res.status(400).json("Error: " + err));
    }

    createCarrier(req, res) {
        const newCarrier = new CarrierDomain(req.body)
        newCarrier
            .save()
            .then(data => res.json(data))
            .catch((err) => { res.status(400).json('Error' + err) })
    }


    deleteCarrier(req, res) {
        const id = req.params.id;
        CarrierDomain.findByIdAndDelete(id, {}, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json('Deleted carrier with id' + id)
            }
        })
    }

    createUser(req, res) {
        const { userName } = req.body;
        const newUser = new UserDomain(req.body);
        UserDomain.find({ 'userName': userName }, (err, user) => {
            if (user.length > 0) {
                res.status(400).json(`User with ${userName} Already EXISTS or  ${err}`);
            } else {
                newUser
                    .save()
                    .then(data => res.json(data))
                    .catch(err => { res.status(400).json('Error:' + err) })
            }
        })
            .catch((err) => res.status(400).json(`failed to create new user: ${err}`));
    }


    deleteUser(req, res) {
        const id = req.params.id;
        UserDomain.findByIdAndDelete(id, {}, (err, doc) => {
            if (err) {
                res.status(400).json(err)
            } else {
                console.log(doc, ' this is the found obj')

                res.status(200).json(doc);
            }
        })

    }

    updateUser(req, res) {
        const id = req.params.id;
        const { userName, password } = req.body;
        UserDomain.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
            if (!err) {
                user.userName = userName
                user.password = password
                user.save((err, user) => {
                    if (!err) {
                        res.send(user)
                    } else {
                        res.status(400).json('Error: User was not updated:' + err)
                    }
                })
            }
            else {
                res.status(400).json("Error: User did not update" + err)
            }
        })
            .catch((err) =>
                res.status(400).json("Error: Broker fee did not update" + err)
            );
    }


    getAllUsers(req, res) {
        UserDomain.find({}, (err, users) => {
            if (!err) {
                res.send(users);
            } else {
                res.status(400).json('Error' + err)

            }
        })
            .catch(err => res.sendStatus(400).json("unable to fetch users" + err))
    }

}


module.exports = AAMService;
