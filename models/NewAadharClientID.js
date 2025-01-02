const mongoose = require('mongoose');

const AadhaarClientIDSchema = new mongoose.Schema({
  client_id:String,
  aadhaar_number:String,
  vDate:Number,
});


module.exports = AadhaarClientIDSchema;