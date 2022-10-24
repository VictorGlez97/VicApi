const dbConn = require('../../config/db/config');

var Games = function(game){
    this.local = game.local,
    this.away = game.away,
    this.local_result = game.local_result,
    this.away_result = game.away_result,
    this.date = game.date
}

Games.create = async function ( newgame, result ) {

    console.log('model', newgame);

    try {
        
        dbConn.query('INSERT INTO Games set ?', newgame, function (err, res) {

            if ( err ) {
                
                console.log( 'error: ', err );
                result( err, null );

            } else {

                console.log( res.insertId );
                result( null, res.insertId );

            }

        });

    } catch (error) {
        
        console.log( 'error: ', error );
        result( error, null )

    }

}

Games.findll = async function ( game, result ) {

    console.log( game );

    try {
        
        var query = 'SELECT * FROM Games';

        if ( game.local !== '' && game.away !== '' && game.date !== '' ) {
            query += ' WHERE ';
            query = game.local !== '' ? ` ${ query } local = ${ game.local } ` : query;
            query = game.away !== '' ? ` ${ query } AND away = ${ game.away } ` : query;
            query = game.date !== '' ? ` ${ query } AND date = ${ game.date } ` : query;
        }

        if ( game.team !== '' ) {
            query += ` WHERE local = ${ query.team } OR away = ${ query.team } `;
        }

        dbConn.query( query, function ( err, res ) {

            if ( err ) {
                
                console.log( 'error: ', err );
                result( err, null );

            } else {

                console.log( res );
                result( null, res );

            }

        });

    } catch (error) {
        
        console.log( 'error: ', error );
        result( error, null );

    }

}

module.exports = Games;