
//app.js
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

//12. import models
const ProductSurvey = require('./database/models/productSurvey');
const BankingSurvey = require('./database/models/bankingSurvey');
app.use(express.json());

/*
CORS - Cross Origin Request Security. 
localhost:3000 - backend API 
localhost: 4200 - front-end
*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res. header ("Access-Control-Allow-Headers", "Origin, X-Requested-Whith, Content-Type, Accept");
    next();
});
//---------------------------------------------------------------ROUTING PRODUCT SURVEYS-------------------------------------------------------
//13. Define route to display or read list of PRODUCT SURVEYS created
app.get('/productSurveys', (re, res) => {
    ProductSurvey.find({})
                .then(productSurveys => res.send(productSurveys))
                .catch((error) => console.log(error));
});

// 14. Define route to create PRODUCT SURVEYS
app.post('/productSurveys', (req, res) => {
    (new ProductSurvey({
        taste: req.body.taste,
        flavor: req.body.flavor,
        packaging: req.body.packaging,
        price: req.body.price,
        availability: req.body.availability,
        nutrition: req.body.nutrition,
        variety: req.body.variety,
        overallSatisfaction: req.body.overallSatisfaction
    }))
    .save()
    .then((productSurvey) => res.send(productSurvey))
    .catch((error) => console.log(error));
});

//15. Display list of PRODUCT SURVEYS updated
app.get('/productSurveys/:productSurveyId', (req, res)=> {
    ProductSurvey.find({ _id: req.params.productSurveyId })
    .then((productSurvey) => res.send(productSurvey))
    .catch((error) => console.log(error));
})

//---------------------------------------------------------------ROUTING BANKING SURVEYS-------------------------------------------------------
//16. Define route to display or read list of BANKING SURVEYS created
app.get('/bankingSurveys', (re, res) => {
    BankingSurvey.find({})
                .then(bankingSurveys => res.send(bankingSurveys))
                .catch((error) => console.log(error));
});

// 17. Define route to create BANKING SURVEYS
app.post('/bankingSurveys', (req, res) => {
    (new BankingSurvey({
        easeOfUse: req.body.easeOfUse,
        customerService: req.body.customerService,
        security: req.body.security,
        accountFeatures: req.body.accountFeatures,
        interestRates: req.body.interestRates,
        feesAndCharges: req.body.feesAndCharges,
        onlineAndMobileBanking: req.body.onlineAndMobileBanking,
        overallSatisfaction: req.body.overallSatisfaction
    }))
    .save()
    .then((bankingSurvey) => res.send(bankingSurvey))
    .catch((error) => console.log(error));
});

//18. Display list of BANKING SURVEYS updated
app.get('/bankingSurveys/:bankingSurveyId', (req, res)=> {
    BankingSurvey.find({ _id: req.params.bankingSurveyId })
    .then((bankingSurvey) => res.send(bankingSurvey))
    .catch((error) => console.log(error));
})

app.listen(3000, () => console.log("Server is connected on port 3000"));

//19. ***********************************  move to the front end set up  ***************************************************************