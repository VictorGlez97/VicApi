
const Bill = require('../models/Bill.model');

exports.create = function( req, res ) {

    const new_bill = new Bill(req.body);

    // console.log( 'controller', new_bill );

    console.log( req.body.constructor == Object );

    if ( req.body.constructor !== Object ) {
        res.status(400).send({ error: true, message: 'Please provide all require fields' });
    }

    Bill.create( new_bill, function ( err, bill ) {

        if ( err ) {
            res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
        } else {
            res.status(201).json({ Success: true, Error: false, Message: 'Bill added successfully', Complete: true });
        }

    });

}

exports.findByPeriod = function ( req, res ) {
    
    console.log( req.body );

    Bill.findByPeriod( req.body, function ( err, bill ) {

        if ( err ) {
            res.send(err);
        } else {
            res.json( bill );
        }

    });

}
