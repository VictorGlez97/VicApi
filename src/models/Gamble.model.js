
const moment = require('moment');

var dbConn = require('../../config/db/config');

var Gambles = function(gambles) {
    this.Gamble = gambles.Gamble,
    this.Comments = gambles.Comments,
    this.Odd = gambles.Odd,
    this.Price = gambles.Price,
    this.Bank = gambles.Bank,
    this.Win = gambles.Win
}

Gambles.getByPeriod = async function ( result ) {
    
    try {
        
        dbConn.query(`SELECT * FROM Catalog WHERE Active = true AND Module = 'Bank' && (Section = 'Initial_Day' OR Section = 'Finish_Day')`, function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }

            const IB = res[0].Section === 'Initial_Day' ? moment().format(`YYYY-MM-${res[0].Value}`) : moment().format(`YYYY-MM-${res[1].Value}`);
            const FB = res[0].Section === 'Finish_Day' ? moment().add(1, 'months').add(-1, 'days').format(`YYYY-MM-${res[0].Value}`) : moment().add(1, 'months').format(`YYYY-MM-${res[1].Value}`);

            dbConn.query('SELECT * FROM Bank WHERE DInitial = ? AND DFinal = ?', [IB, moment(FB).add(-1, 'days').format('YYYY-MM-DD')], function ( errBank, resBank ) {

                console.log( resBank );

                if (resBank === undefined || resBank[0] === undefined || resBank[0].BankID === undefined) {
                    result('please create a new bank register', null);
                    return;
                }                

                const BankID = resBank[0].BankID;

                if ( errBank ) {
                    console.log( 'error: ', errBank );
                    result( errBank, null );
                }

                if ( BankID <= 0 ) {
                    console.log( 'error: don´t exist bank to the gamble' );
                    result( 'don´t exist bank to the gamble', null );
                    return;
                }

                dbConn.query('SELECT * FROM Gambles WHERE Bank = ?', [ BankID ], function ( errGamble, resGamble ) {

                    //console.log( resGamble );

                    if ( errGamble ) {
                        console.log( 'error: ', errGamble );
                        result( errGamble, null );
                    } else {
                        result( null, resGamble );
                    }

                });

            });

        });

    } catch (error) {
        console.log( error );
        result( error, null );
    }

}

Gambles.create = async function ( newGamble, result ) {

    try {

        dbConn.query(`SELECT * FROM Catalog WHERE Active = true AND Module = 'Bank' && (Section = 'Initial_Day' OR Section = 'Finish_Day')`, function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }

            const IB = res[0].Section === 'Initial_Day' ? moment().format(`YYYY-MM-${res[0].Value}`) : moment().format(`YYYY-MM-${res[1].Value}`);
            const FB = res[0].Section === 'Finish_Day' ? moment().add(1, 'months').add(-1, 'days').format(`YYYY-MM-${res[0].Value}`) : moment().add(1, 'months').format(`YYYY-MM-${res[1].Value}`);

            console.log(IB);
            console.log(moment(FB).add(-1, 'days').format('YYYY-MM-DD'));            

            dbConn.query('SELECT * FROM Bank WHERE DInitial = ? AND DFinal = ?', [IB, moment(FB).add(-1, 'days').format('YYYY-MM-DD')], function ( errBank, resBank ) {

                console.log( resBank );

                if (resBank === undefined || resBank[0] === undefined || resBank[0].BankID === undefined) {
                    result('don´t exist bank to the gambie, please register a new bank to register gambles', null);
                    return;
                }                

                const BankID = resBank[0].BankID;

                if ( errBank ) {
                    console.log( 'error: ', errBank );
                    result( errBank, null );
                }

                if ( BankID <= 0 ) {
                    console.log( 'error: don´t exist bank to the gamble' );
                    result( 'don´t exist bank to the gamble', null );
                    return;
                }

                newGamble.Bank = BankID;
                //console.log( BankID );
                console.log( newGamble );

                dbConn.query('INSERT INTO Gambles set ?', newGamble, function ( errGamble, resGamble ) {

                    if ( errGamble ) {
                        console.log( 'error: ', errGamble );
                        result( errGamble, null );
                    } else {
                        result( null, 'Gamble added successfully' );
                    }

                });

            });

        });

    } catch (error) {
        console.log( 'error: ', error );
        result( error, '' );
    }

}

Gambles.update = function ( GambleID, gamble, result ) {

    try {
     
        console.log(gamble);

        dbConn.query('UPDATE Gambles SET Gamble = ?, Comments = ?, Odd = ?, Price = ?, Bank = ?, Win = ? WHERE GambleID = ?', [gamble.Gamble, gamble.Comments, gamble.Odd, gamble.Price, gamble.Bank, gamble.Win, GambleID], function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );            
            } else {
                result( null, 'Gamble updated successfully' );
            }
    
        });

    } catch (error) {        
        console.log(error);
        result( error, null );
    }

}

Gambles.delete = function ( GambleID, result ) {

    try {
        
        dbConn.query('DELETE FROM Gambles WHERE GambleID = ?', [GambleID], function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );            
            } else {
                result( null, 'Gamble deleted successfully' );
            }
    
        });

    } catch (error) {
        
        console.log( error );
        result( error, null );
    }

}

module.exports = Gambles;
