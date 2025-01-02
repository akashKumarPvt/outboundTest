const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  country: { type: String },
  dist: { type: String },
  state: { type: String },
  po: { type: String },
  loc: { type: String },
  vtc: { type: String },
  subdist: { type: String },
  street: { type: String },
  house: { type: String },
  landmark: { type: String }
});

const newAadharSchema = new mongoose.Schema({
  client_id: { type: String },
  full_name: { type: String },
  aadhaar_number: { type: String },
  dob: { type: Date },
  gender: { type: String },
  address: { type: AddressSchema },
  face_status: { type: Boolean },
  face_score: { type: Number },
  zip: { type: String },
  profile_image: { type: String},
  has_image: { type: Boolean },
  email_hash: { type: String, default: '' },
  mobile_hash: { type: String },
  raw_xml: { type: String },
  zip_data: { type: String },
  care_of: { type: String },
  share_code: { type: String },
  mobile_verified: { type: Boolean },
  reference_id: { type: String },
  aadhaar_pdf: { type: String, default: null },
  status: { type: String },
  uniqueness_id: { type: String, default: '' }
});

module.exports = newAadharSchema;