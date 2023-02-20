
const Gamble = require('../models/Gamble.model');

exports.getByPeriod = function( req, res ) {

    try {
        
        console.log( req );

        Gamble.getByPeriod( function ( err, gambles ) {

            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
            } 
            else {
                console.log( gambles );
                res.status(201).json({ Complete: true, Success: true, Error: false, Data: gambles });
            }

        });

    } catch (error) {
        console.log( error );
        res.status(404).send({ error: true, message: error });
    }

}

exports.create = function( req, res ) {

    try {
        const nGamble = new Gamble(req.body);

        if ( req.body.constructor !== Object ) {
            res.status(400).send({ error: true, message: 'Please supply all require fields' });
        }

        Gamble.create( nGamble, function ( err, gambles ) {

            if (gambles === 'don´t exist bank to the gambie, please register a new bank to register gambles') {
                res.status(200).json({ Complete: true, Success: false, Error: true, Message: gambles });
                return;
            }

            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
            } 
            else {
                res.status(203).json({ Complete: true, Success: true, Error: false, Message: gambles });
            }

        });

    } catch (error) {
        console.log( error );
        res.status(400).json({ Complete: false, Success: false, Error: true, Message: error });
    }

}

exports.update = function ( req, res ) {
        
    try {
        
        // console.log(req);
        const UGamble = new Gamble(req.body);
        const GambleID = req.params.id;

        if ( req.body.constructor !== Object || GambleID <= 0 ) {
            res.status(400).send({ error: true, message: 'Please supply all require fields' });
        }

        Gamble.update( GambleID, UGamble, function ( err, gambles ) {

            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
            } 
            else {
                res.status(203).json({ Complete: true, Success: true, Error: false, Message: gambles });
            }

        });

    } catch (error) {
     
        console.log(error);
        res.status(400).json({ Complete: false, Success: false, Error: true, Message: error });
    }

}

exports.delete = function ( req, res ) {
        
    try {
        
        const GambleID = req.params.id;

        if ( GambleID <= 0 ) {
            res.status(400).send({ error: true, message: 'Please supply all require fields' });
        }

        Gamble.delete( GambleID, function ( err, gambles ) {

            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
            } 
            else {
                res.status(203).json({ Complete: true, Success: true, Error: false, Message: gambles });
            }

        });

    } catch (error) {
     
        console.log(error);
        res.status(400).json({ Complete: false, Success: false, Error: true, Message: error });
    }

}
