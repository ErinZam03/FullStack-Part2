const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//Get: /trips - lists all the trips
// Regardless of outcome, response must include HTML staus code 
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        //uncomment the following line to show results of querey
        // on the console
        console.log(q);

    if(!q)
    {// Database returned no data
        return res
                .status(404)
                .json(err);

    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);

    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single trip
        .exec();

        //uncomment the following line to show results of querey
        // on the console
        console.log(q);

    if(!q)
    {// Database returned no data
        return res
                .status(404)
                .json(err);

    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);

    }
};

//POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsAddTrip = async(req, res) => {
    const newTrip = await Model.create({
        code:        req.body.code,
        name:        req.body.name,
        length:      req.body.length,
        start:       req.body.start,
        resort:      req.body.resort,
        perPerson:   req.body.perPerson,
        image:       req.body.image,
        description: req.body.description
      });

      const q = await newTrip.save();

        if(!q)
            {// Database returned no data
                return res
                        .status(400)
                        .json(err);
    
        } else { // Return resulting trip list
            return res
                .status(201)
                .json(q);
    
        }

        //uncomment the following line to show results of querey
        // on the console
        console.log(q);


};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {

    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
        { 'code' : req.params.tripCode },
        {
                code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    )
    .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
    };

    const tripsDeleteTrip = async (req, res) => {
        try {
          const deleted = await Model
            .findOneAndDelete({ code: req.params.tripCode })
            .exec();
          if (!deleted) {
            return res.status(404).json({ message: 'Trip not found' });
          }
          // 204: No Content
          return res.status(204).end();
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      };
      
      module.exports = {
        tripsList,
        tripsFindByCode,
        tripsAddTrip,
        tripsUpdateTrip,
        tripsDeleteTrip        
      };