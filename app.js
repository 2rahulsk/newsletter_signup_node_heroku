//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req,res) => {

  res.sendFile(__dirname + '/signup.html');


});

app.post('/', (req, res) => {

  var firstName = req.body.f_name;
  var lastName = req.body.l_name;
  var email = req.body.email;

  console.log(firstName);
  console.log(lastName);
  console.log(email);

  const url = "https://us20.api.mailchimp.com/3.0/lists/4eb1f457fb";
  const method = "POST";

  var data = {
      members: [{email_address: email, status: "subscribed",merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }]
  }

  var jsonData = JSON.stringify(data);

  const headers = {
    "Authorization" : "rahul a9bcf203d89fafd2867d3796a6764701-us20"
  }

  var options = {
    url : url,
    method : method,
    headers : headers,
    body :jsonData
  }

  request(options, (error, response, body) => {

    if(response.statusCode === 200) {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/success.html");

    } else {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post('/failure', (req,res) => {
  res.redirect('/');
})

app.listen(process.env.PORT || port, () => {

  console.log('Server is up and running on port 3000...');

});
//process.env.PORT is for listening the server on heroku

//a9bcf203d89fafd2867d3796a6764701-us20
//4eb1f457fb
