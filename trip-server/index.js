const express = require("express");
const port = 3001;
const app = express();
const axios = require("axios");
const unqid = require("unqid");
const sha256 = require("sha256");
const mysql = require('mysql2');
const bodyParser = require('body-parser');


// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Shareef@53",
  database: "shareef"
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



connection.connect((err) => {
  if (err) {
    console.log("connection error....", err);
  } else {
    console.log("database connection successful.....");
  }
});

const phonepe_host = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const merchent_id = "PGTESTPAYUAT";
const salt_index = 1;
const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";


app.get("/", (req, res) => {
  res.send("PhonePe Working.....");
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username+" "+password +"  "+req.body )
    const [rows,fields] = await connection.promise().query(`SELECT * FROM users WHERE email = '${username}'`);
   // console.log(result[0].email +"   "+result[0][1].password);
    
    if(rows.length>0 && rows[0].password===password){
     // res.status(200).json({ message: "Signin successful...." });
      res.redirect("http://localhost:3000/")
    }
    else{
      res.send("check email and password....")
      
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Sign in" });
  }
});



const merchantTransactionId = unqid();
console.log(merchantTransactionId);
console.log(merchantTransactionId);
app.get("/pay", (req, res) => {
  const endpoint = "/pg/v1/pay";
    console.log(req.query.from);
  const payload = {
    merchantId: merchent_id,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: 123,
    amount: 30000,
    redirectUrl: `http://localhost:3001/redirect-url/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const burrObj = Buffer.from(JSON.stringify(payload), "utf8");
  const baseEncoded64 = burrObj.toString("base64");
  const xverify =
    sha256(baseEncoded64 + endpoint + salt_key) + "###" + salt_index;

  const options = {
    method: "post",
    url: `${phonepe_host}${endpoint}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": xverify,
    },
    data: {
      request: baseEncoded64,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const url = response.data.data.instrumentResponse.redirectInfo.url;
      res.redirect(url);
      //res.send(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/redirect-url/:merchantTransactionId", (req, res) => {
  const { merchantTransactionId } = req.params;
  const xverify = sha256(`/pg/v1/status/${merchent_id}/${merchantTransactionId}`+salt_key)+"###"+salt_index;
  console.log(merchantTransactionId);
  if (merchantTransactionId) {
    const options = {
      method: "get",
      url: `${phonepe_host}/pg/v1/status/${merchent_id}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-MERCHANT-ID" : merchantTransactionId,
        "X-VERIFY" : xverify
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
       // res.send(response.data)
        if(response.data.code==='PAYMENT_SUCCESS'){
            res.redirect("http://localhost:3000/plantrip")
        }else if(response.data.code==="PAYMENT_FAILURE"){

        }
        else{

        }
      })
      .catch(function (error) {
        console.error(error);
      });
    //res.send(merchantTransactionId);
  } else {
    res.send("errrorrr.....");
  }
});


app.get("/pay",(req,res)=>{
    console.log(req.query);
})

app.listen(port, (err) => {
  console.log("the server is started listening....");
});
