const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const strReq = {
    type: String,
    required: true,
    trim: true,
    minlength: true,
}

const CarrierSchema = new Schema({
    name: strReq,
    phoneNumber: strReq,
    address: strReq,
    contact: strReq,
    notes: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true,
    }
);

const CarrierDomain = mongoose.model("CarrierDomain", CarrierSchema);

module.exports = CarrierDomain