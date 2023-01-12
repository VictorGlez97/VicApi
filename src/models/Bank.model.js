
var dbConn = require('../../config/db/config');

var Bank = function(bank) {
    this.DInitial = bank.DInitial,
    this.DFinal = bank.DFinal,
    this.Amount = bank.Amount,
    this.User = bank.User
}

Bank.create = async function ( newBank, result ) {

    try {
        
        console.log( newBank );

        dbConn.query('INSERT INTO Bank set ?', newBank, function (err, res) {

            console.log( err );
            console.log( res );

            if ( err ) {
                result( err, null );
            } else {
                result( null, res );
            }

        });

    } catch (error) {
        
        console.log( 'error: ', error );

    }

}

module.exports = Bank;
