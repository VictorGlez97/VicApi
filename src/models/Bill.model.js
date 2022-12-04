
var dbConn = require('../../config/db/config');

var Bill = function(bill) {
    this.Name = bill.Name,
    this.Amount = bill.Amount,
    this.Date = bill.Date,
    this.User = bill.User,
    this.Type = bill.Type,
    this.Budget = bill.Budget
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

        var response = [];

        await dbConn.query('SELECT U.Name AS UserName, B.BillID, B.Name, B.Amount, B.Date, (SELECT Value FROM Catalog WHERE CatalogID = B.Type) AS Type, (SELECT Value FROM Catalog WHERE CatalogID = B.Budget) AS Budget FROM Bills B INNER JOIN Users U ON B.User = U.UserID WHERE B.Date >= ? AND B.Date <= ? AND User = ?', [billObj.DI, billObj.DL, billObj.User], function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            } else {
                // response.push('registers' = res);
                result( null, res );
            }

        });        

    } catch (error) {
        
        console.log( error );
        result( error, null );

    }

}

Bill.findByCounts = async function ( billObj, result ) {

    console.log( billObj );

    try { 

        var response = [];

        await dbConn.query('SELECT SUM(Amount) AS Amount, (SELECT Value FROM Catalog WHERE CatalogID = Type) AS Tipo FROM Bills WHERE Date BETWEEN ? AND ? AND User = ? GROUP BY Type', [billObj.DI, billObj.DL, billObj.User], function ( err, res ) {

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            } else {
                result( null, res );
            }
        
        });        

    } catch (error) {
        
        console.log( error );
        result( error, null );

    }

} 

module.exports = Bill;
