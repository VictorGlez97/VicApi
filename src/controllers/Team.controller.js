const Team = require('../models/Team.model');

exports.findAll = function ( req, res ) {

    Team.findAll( function ( err, teams ) {

        console.log( teams );

        if ( err ) {
            res.status(400).send( err );
        } else {
            res.status(200).json( teams );
        }

    });

}

exports.create = function ( req, res ) {

    const newteam = new Team(req.body);

    console.log( 'controller', newteam );

    if ( req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
        res.status(400)
        .send({ error: true, message: 'Pleace provide all requires fields' });
    }

    Team.create( newteam, function ( err, team ) {

        if ( err ) {
            res.status(400).send( err );
        } else {
            res.status(203).json({ error: false, message: 'Team added succesfully', data: team });
        }

    });

}