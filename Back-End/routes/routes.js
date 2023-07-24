const express = require("express")
const router = express.Router();
var incidentModel = require('../models/incidentModel');

//Create Records
router.post('/incident/create', async (req, res) => {
    try {
      const incident = new incidentModel(req.body);
      await incident.validate(); // Validate the input data
  
      await incident.save();
      res.status(201).send({
        status: true,
        message: "Incident ticket Created!"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

//View all records
router.get('/incidents', async(req,res)=>{
   
   try{
        const incidents = await incidentModel.find({});
        res.send(incidents);
   }
   catch(error)
   {
        res.status(400).send(error);
   }
});

//find records
router.get('/incidents/:id', async(req,res)=>{
   
    try{
         const _id = req.params._id;
         const incidents = await incidentModel.findById({_id});
        if(!incidents)
        {
            return res.status(404).send();
        }  
        return res.status(200).send(incidents); 
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });
 
//update records
 router.patch('/incidents/:id', async(req,res)=>{
   
    try{
        const _id = req.params.id;
        const body = req.body;
        const updateIncidents = await incidentModel.findByIdAndUpdate(_id,body,{new:true});
        if(!updateIncidents)
        {
            return res.status(404).send();
        }  
     
        res.status(201).send(
            {
                "status" : true,
                "message" : "Incident ticket updated!"
            });
 
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 
 });

//delete records
 router.delete('/incidents/:id', async(req,res)=>{
   
    try{
            const _id = req.params.id;
        
         const deleteIncidents = await incidentModel.findByIdAndDelete(_id);
        if(!deleteIncidents)
        {
            return res.status(404).send();
        }  
       
        res.status(201).send(
            {
                "status" : true,
                "message" : "Incident tiket Deletedd!"
            });
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });

 // Route to close an incident
 router.patch("/incidents/close/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const incident = await incidentModel.findByIdAndUpdate(
      _id,
      { $set: { status: "Closed" } }, 
      { new: true }
    );
    if (!incident) {
      return res.status(404).send();
    }
    res.status(200).send({
      status: true,
      message: "Incident closed successfully!",
      incident: incident
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// View all closed incidents
router.get('/closed-incidents', async (req, res) => {
  try {
    const closedIncidents = await incidentModel.find({ status: "Closed" });
    res.send(closedIncidents);
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;

