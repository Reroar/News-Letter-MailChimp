const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html" )
});

app.post("/", function(req,res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                maerge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    };
    
    console.log(fName , lName , email);
    const jsonData = JSON.stringify(data);

    const url =  "https://us8.api.mailchimp.com/3.0/lists/a2f1eeada4"

    const options = {
        method : 'POST',
        auth : "reroar:03747940a096af19fc5d543e02d5c25c-us8"
    }
    const request = https.request(url, options, function(response){
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })        
        if(response.statusCode == 200){
            res.send("It was a success");
        }
        else{
            res.send("It was failure");
        }
        
    })

    request.write(jsonData);
    request.end();
});

app.listen(3003, function(){
    console.log("The server is now running on port 3003");
});
// api key
// 03747940a096af19fc5d543e02d5c25c-us8

// list id
// a2f1eeada4
