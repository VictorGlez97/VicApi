
var dbConn = require('../../config/db/config');

var Bill = function(bill) {
    this.Name = bill.Name,
    this.Amount = bill.Amount,
    this.Date = bill.Date,
    this.User = bill.User
}

var TypeBill = function(tb) {
    this.Name = tb.Name,
    this.Priority = tb.Priority 
}


Bill.create = async function ( newBill, result ) {

    try {
        
        console.log( 'model', newBill );
        
        dbConn.query('INSERT INTO Bills set ?', newBill, function ( err, res ) {

            console.log( err );

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
        result( error, null )

    }

}

Bill.findByPeriod = async function ( billObj, result ) {

    console.log( billObj );

    try { 

        await dbConn.query('SELECT U.Name AS UserName, B.BillID, B.Name, B.Amount, B.Date FROM Bills B INNER JOIN Users U ON B.User = U.UserID WHERE B.Date >= ? AND B.Date <= ?', [billObj.DI, billObj.DL], function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            } else {

                res.map(item => {
                    console.log(item);
                });

                result( null, res );
            }

        });

    } catch (error) {
        
        console.log( error );
        result( error, null );

    }

}

module.exports = Bill;
