const Games = require('../models/Games.model');

exports.create = function( req, res ) {

    const newgame = new Games(req.body);

    console.log( 'controller', newgame );

    if ( req.body.constructor == Object && Object.keys(req.body).length > 1 ) {
        res.status(400).send({ error: true, message: 'Provide the correct body' });
    }

    Games.create( newgame, function ( err, gam ) {

        if ( err ) {
            res.status(401).json({ error: true, message: `Error: ${ err }` });
        } else {
            res.status(203).json({ error: false, message: 'Game added successfuly', data: gam });
        }

    });

}

exports.findll = function ( req, res ) {

    if ( req.body.constructor == Object && Object.keys(req.body).length > 0 ) {
        res.status(400).json({ error: true, message: 'Provide one of the thinks to search games' });
    }

    Games.findll( req.body, function ( err, gam ) {

        if ( err ) {
            res.status(401).json({ error: true, message: `Error: ${ err }` });
        } else {
            res.status(200).json({ error: false, message: 'Successfuly', data: gam });
        }

    });

}
