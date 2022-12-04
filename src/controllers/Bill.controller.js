
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
            res.status(201).json({ Complete: true, Success: true, Error: false, Message: 'Bill added successfully' });
        }

    });

}

exports.findByPeriod = function ( req, res ) {
    
    console.log( req.body );
    BillsByPeriod = [];
    CountsByPeriod = [];
    
    try {
     
        Bill.findByPeriod( req.body, function ( err, bill ) {
            if ( err ) {
                res.send(err);
            } else {
                BillsByPeriod = bill;
            }
        });
    
        Bill.findByCounts( req.body, function ( err, counts ) {
            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: err });
            } else {
                CountsByPeriod = counts;
                res.status(201).json({ Complete: true, Success: true, Error: false, Message: 'Succesfully', Bills: BillsByPeriod, Counts: CountsByPeriod });
            }
        });
        
    } catch ( error ) {
        console.log( error );
        res.status(403).json({ Complete: false, Success: false, Error: true, Message: error });
    }
}
