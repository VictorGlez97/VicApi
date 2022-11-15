
var dbConn = require('../../config/db/config');

var Catalog = function(catalog) {
    this.Module = catalog.Module,
    this.Section = catalog.Section,
    this.Value = catalog.Value,
    this.Active = catalog.Active
}

Catalog.create = async function ( newCatalog, result ) {

    try {
        
        console.log( newCatalog );

        dbConn.query('INSERT INTO Catalog set ?', newCatalog, function ( err, res ) {

            console.log( err );

            if ( err ) {
                console.log( 'error: ', err );
                result( err, null );
            } else {
                console.log( res );
                result( null, err );
            }

        });

    } catch (error) { 
        console.log( error );
        result( error, null );
    }

}

Catalog.find = async function ( module, section, result ) {

    try {

        console.log( module );
        console.log( section );

        var consult = section != '' ? 'SELECT Value FROM Catalog WHERE Module = ? AND Section = ?' : 'SELECT Value FROM Catalog WHERE Module = ?';
        var values = section != '' ? [ module, section ] : [ module ]; 

        console.log( consult );
        console.log( section );

        dbConn.query(consult, values, function ( err, res ) {

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
        result( error, null );
    }

}

module.exports = Catalog;
