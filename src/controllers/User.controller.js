const dbConn = require('../../config/db/config');
const User = require('../models/User.model');

exports.create = function( req, res ) {

    const new_user = new User(req.body);

    console.log('controller', new_user);

    if ( req.body.constructor == Object && Object.keys(req.body).length === 0 ) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }

    User.create(new_user, function ( err, user ) {
        
        if (err)

        res.send(err)

        res.json({ error: true, message: 'User added successfully!', data: user });

    });

}

exports.login = function ( req, res ) {

    const new_user = new User(req.body);

    //console.log('controller', new_user);

    if ( req.body.constructor == Object && Object.keys(req.body).length === 0 ) {
        res.status(400).send({ error: true, message: 'Please provide the Alias and the Password' });
    }

    User.Login(new_user, function ( err, user ) {
        
        console.log( err, user );

        if (err)

        res.send(err)

        res.json({ error: true, message: 'login successfully!', data: user });

    });
    
}

exports.findAll = function ( req, res ) {

    User.findAll( function ( err, users ) {

        console.log(users);

        if ( err ){
            res.send(err);
        } else {
            res.json(users);
        }

    })

}

exports.findById = function ( req, res ) {

    User.findById( req.params.id, function ( err, user ){
        
        if ( err )

        res.send(err);

        res.json(user);
    
    });

}

exports.delete = function ( req, res ) {

    User.delete( req.params.id, function ( err, user ){

        if ( err )

        res.json( err );

        res.json( user );

    });

}
