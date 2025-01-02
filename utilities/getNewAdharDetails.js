const { usersDatabaseDB } = require("../db/conn2");
const AadhaarClientIDSchema = require("../models/NewAadharClientID");
const AdhaarNewSchema = require("../models/NewAadhaarSchema");
// const { InvisibleAPI } = require("../utils/InvisibleAPI");
const AadhaarClientIDDetails = usersDatabaseDB.model("aadhaarClientIDSchema", AadhaarClientIDSchema);
const AadharNewDetails = usersDatabaseDB.model("aadharNewDetail",AdhaarNewSchema);
const {AadharImage}=require("./AdharImageExtract");


function InvisibleAPI(data,route,subroute) {
    console.log(data,route,subroute);
    const options = {
        method: "POST",
        maxBodyLength: Infinity,
        url:`https://api.invincibleocean.com/invincible/${route}/${subroute}`,
        headers: {
            'Content-Type': 'application/json',
            'clientId':"962c8a8a3ea6b34f31888a5256e2b93b:794703a1964c92e83aef52aaa0d6db77",
            'secretKey': "ltAOpD5f4bTP0zFWVO4cmUg8n57M4NhMl1Le104AROpUUj1P3x5oQGjt3sXdhpKMQ"
        },
        data: data,
      };
      return axios
      .request(options)
      .then(function (response) {
        // console.log(response.data, "response.data");
        return response.data;
      })
      .catch(function (error) {
        // console.error(error);
        return { code: 404, message: 'ERROR: Data Not Found !' };
      });
}

async function getAadaarRefIDDetail(aadhaarno){
    let aadhaarClientIDDetail=await AadhaarClientIDDetails.findOne({aadhaar_number:aadhaarno});
    const data = {aadhaarNumber: aadhaarno};
    const response = await InvisibleAPI(data,"aadhaarVerification/requestOtp");
    console.log(response);
    if (response && response.result.data && response.result.data.client_id){
        if(aadhaarClientIDDetail){
            aadhaarClientIDDetail.client_id=response.result.data.client_id;
            aadhaarClientIDDetail.vDate=Date.now();
            aadhaarClientIDDetail.save();
        }
        else {
            aadhaarClientIDDetail={aadhaar_number:aadhaarno, client_id:response.result.data.client_id, vDate:Date.now() }
            aadhaarClientIDDetail=new AadhaarClientIDDetails(aadhaarClientIDDetail);
            // AadharImage({aadhaarNumber:aadhaarno,ImgURL:aadhaarClientIDDetail.profile_image});
            aadhaarClientIDDetail.save();
        }
        return aadhaarClientIDDetail;
    } else {
      return null
    }
}

async function getAddharDetailsOtpUpdate(aadhaarno, otp){
    let aadhaarClientIDDetail = await AadhaarClientIDDetails.findOne({aadhaar_number:aadhaarno});
    let aadhaardetail = await AadharNewDetails.findOne({ aadhaar_number: aadhaarno });
    console.log(aadhaardetail);
    try{
    if(aadhaarClientIDDetail){
        console.log(aadhaarClientIDDetail.client_id,"Inisde OTP UPdate")
        const data = { client_id:aadhaarClientIDDetail.client_id,otp:otp };
        const response = await InvisibleAPI(data,"aadhaarVerification/submitOtp");
        if(response.code==200){
            if(aadhaardetail){
                aadhaardetail=response.result.data;
                aadhaardetail.vDate=Date.now();
                aadhaardetail.aadhaar_number=aadhaarno;
            }
            else{
                aadhaardetail=new AadharNewDetails(response.result.data);
                const saveImg=await AadharImage({aadhaarNumber:aadhaarno,ImgURL:`data:image/jpeg;base64,${aadhaardetail.profile_image}`});
                console.log(saveImg);
                aadhaardetail.vDate=Date.now();
                aadhaardetail.aadhaar_number=aadhaarno;
                aadhaardetail.save();
            }
        }
        return aadhaardetail;
    }
    else{
      return null;
    }
    }catch(err){
        console.log(err);
    }
}

async function getAadhaarDetail(aadhaarno){
    let aadhaardetail = await AadharNewDetails.findOne({ aadhaar_number: aadhaarno });
    return aadhaardetail;
}

module.exports = { getAadaarRefIDDetail, getAddharDetailsOtpUpdate, getAadhaarDetail };