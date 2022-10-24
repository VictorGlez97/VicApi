const dbConn = require("../../config/db/config");

var Team = function(team) {
    this.Name = team.Name,
    this.Country = team.Country,
    this.Coords = team.Coords
}

Team.findAll = function ( result ) {

    try {
        
        dbConn.query('SELECT * FROM Teams', function ( err, res ) {

            if ( err ) {
                
                console.log( 'error: ', err );
                result( err, null );

            } else {

                console.log( res );
                result( null, res );

            }

        });

    } catch (error) {
        
        console.log( error );
        result( error, null );

    }

}

Team.findById = function ( id, result ) {

    try {
        
        dbConn.query('SELECT * FROM Teams WHERE TeamID = ?', id, function ( err, res ) {
 
            if ( err ) {
                
                console.log( 'error: ', err );
                result( err, null )

            } else {

                console.log( res );
                result( null, res );

            }
            
        })

    } catch (error) {
        
        console.log( error );
        result( err, null );

    }

}

Team.create = function( newteam, result ) {

    console.log( 'model', newteam );

    try {
        
        dbConn.query('INSERT INTO Teams set ?', newteam, function ( err, res ) {

            if ( err ) {
                
                console.log( 'error: ', err );
                result( err, null );

            } else {

                console.log( res );
                result( null, res );

            }

        });

    } catch (error) {
        
        console.log( error );
        result( error, null );

    }

}

module.exports = Team;