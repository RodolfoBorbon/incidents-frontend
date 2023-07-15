let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(SurveyList);

            /*
            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayName : ''});      
            */

            res.json(surveyList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    /*
    res.render('survey/add', {title: 'Add Survey', 
    displayName: req.user ? req.user.displayName : ''});
    */
   
    res.json({success: true, msg: 'Succesfully Displayed Add Page'});
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "occupation": req.body.occupation,
        "attitude": req.body.attitude,
        "gender": req.body.gender,
        "feedback": req.body.feedback
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            //res.redirect('/survey-list');

            res.json({success: true, msg: 'Successfully Added New Survey'});
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            /*
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''});
            */

            res.json({success: true, msg: 'Successfully Displayed Survey to Edit', survey: surveyToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "occupation": req.body.occupation,
        "attitude": req.body.attitude,
        "gender": req.body.gender,
        "feedback": req.body.feedback
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            //res.redirect('/survey-list');

            res.json({success: true, msg: 'Successfully Edited Survey', survey: updatedSurvey});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             //res.redirect('/survey-list');

             res.json({success: true, msg: 'Successfully Deleted Survey'});
        }
    });
}