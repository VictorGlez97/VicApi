
const bcrypt = require('bcryptjs');

var dbConn = require('./../../config/db/config');

var User = function(user){
    this.Name = user.Name,
    this.Alias = user.Alias,
    this.Password = user.Password
}

User.create = async function ( newUs, result ) {

    console.log('model', newUs);

    const salt = await bcrypt.genSalt(10);
    newUs.Password = await bcrypt.hash(newUs.Password, salt);

    dbConn.query('INSERT INTO Users set ?', newUs, function ( err, res ){
        
        if ( err ) {
            console.log('error:', err);
            result(err, null);            
        } else {
            console.log( res.insertId );
            result(null, res.insertId);
        }
    });

}

User.Login = function( user, result ) {

    dbConn.query('SELECT * FROM Users WHERE Alias = ?', user.Alias, async function ( err, res ) {

        if (err) {
            console.log( 'error: ', err );
            result( 'Alias or Password not found', null );
        } else {

            // console.log(user.Password);
            // console.log(res[0].Password);
            //console.log(res);
            const validPass = await bcrypt.compare(user.Password, res[0].Password);
            
            console.log( user.Password, res.Password );
            console.log( validPass );

            if ( !validPass ) {
                result( 'Alias or Password invalid', null );
            } else {
                res[0].Password = 'Confidence';
                result( null, res[0] );
            }

        }

    });

}

User.findById = function( id, result ) {

    dbConn.query('SELECT * FROM Users WHERE UserID = ?', id, function ( err, res ) {
        
        if ( err ) {
            console.log('error: ', err);
            result( err, null );
        } else {

            res.map( us => { us.Password = 'Confidence'; } );

            result( null, res )
        }

    });

}

User.findAll = function ( result ) {

    dbConn.query('SELECT * FROM Users', function ( err, res ) {

        if ( err ) {
            console.log( 'error: ', err );
            result( err, null );
        } else {
            res.map( us => { us.Password = 'Confidence'; } );
            console.log(res);
            result( null, res );
        }

    });

}

User.update = function ( id, user, result ) {

    dbConn.query('UPDATE Users SET Name = ?, Alias = ?, Password = ? WHERE UserID = ?', [user.Name, user.Alias, user.Password, id], function ( err, res ) {

        if ( err ) {
            console.log( 'error: ', err );
            result( err, null );            
        } else {
            result( null, res );
        }

    });

}

User.delete = function ( id, result ) {

    dbConn.query('DELETE FROM Users WHERE UserID = ?', id, function ( err, res ) {

        if ( err ) {
            console.log( err );
            result( err, null );
        } else {
            result( null, err );
        }

    });

}



module.exports = User;