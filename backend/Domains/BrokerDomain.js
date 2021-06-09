const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarrierDomain = require('./CarrierDomain.js');

const strReq = {
    type: String,
    required: true,
    trim: true,
    minlength: true,
}
const BrokerScehma = new Schema(
    {
        userName: strReq,
        vehInfo: {
            vehYear: strReq,
            vehMake: strReq,
            vehModel: strReq

        },
        receivable: strReq,
        comments: {
            type: String,
            trim: true
        },
        buyerNum: {
            type: String,
            trim: true
        },
        lotNum: {
            type: String,
            trim: true
        },
        orderId: strReq,
        carrier: CarrierDomain.schema,
        paid: {
            type: Boolean
        },
        paidTo: {
            type: String,
            trim: true
        },
        deliveryDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const BrokerDomain = mongoose.model("BrokerDomain", BrokerScehma);

module.exports = BrokerDomain;
