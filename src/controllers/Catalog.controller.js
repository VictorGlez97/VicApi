
const Catalog = require('../models/Catalog.model');

exports.create = function( req, res ) {

    try {
    
        const new_catalog = new Catalog(req.body);

        console.log( new_catalog );

        if ( req.body.constructor !== Object ) {
            res.status(400).send({ error: true, message: 'Provide all data required' });
        }

        Catalog.create( new_catalog, function ( err, response ) {

            if ( err ) {
                res.send(err);
            } else {
                res.json({ error: false, message: 'Catalog create' });
            }

        })

    } catch (error) {
        res.status(400).send( error );        
    }

}

exports.find = function( req, res ) {

    try {
    
        if ( req.params.module == '' && req.params.section == '' ) {
            res.status(400).send({ error: true, message: 'Provide all data required' });
        }

        Catalog.find( req.params.module, req.params.section, function ( err, response ) {
            if ( err ) {
                res.status(400).send(err);
            } else {
                res.status(200).send(response);
            }
        })

    } catch (error) {
        res.status(400).send( error );
    }

}
