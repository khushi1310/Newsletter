const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/" , function(req,res){
    const first = req.body.Fname ;
    const second = req.body.Lname ;
    const email = req.body.email ;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: second
                }
            }
        ]
    }
    const jsondata = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/8036ee3e8"; //a
    const options = {
        method: "POST",
        auth: "kt:e84c5c2f075dc60b5468bb1b8e2e2ccf-us8"

    }
    const request = https.request(url,options,function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log("yes");
        })
    });
    request.write(jsondata);
    // console.log(request);
    request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server");
})
// api : e84c5c2f075dc60b5468bb1b8e2e2ccf-us8
// 