
const Bank = require('../models/Bank.model');

exports.create = function ( req, res ) {

    try {

        const newBank = new Bank( req.body );
    
        if ( req.body.constructor !== Object ) {
            res.status(400).json({ Complete: false, Success: false, Error: true, Message: 'send the values required' });
        }

        Bank.create( newBank, function ( err, bank ) {
            if ( err ) {
                res.status(400).json({ Complete: true, Success: false, Error: true, Message: error });
            } else {
                res.status(203).json({ Complete: true, Success: true, Error: false, Message: 'Bank register added successfully' });
            }
        })

    } catch (error) {
        
        console.log( 'error: ', error );
        res.status(400).json({ Complete: false, Success: false, Error: true, Message: error });

    }

}
