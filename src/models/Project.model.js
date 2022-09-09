
var dbConn = require('../../config/db/config');

var Project = function(project) {
    this.Name = project.Name,
    this.User = project.User
}

var ProjectToDo = function(projecttodo) {
    this.Task = projecttodo.Task,
    this.Detail = projecttodo.Detail,
    this.Done = projecttodo.Done,
    this.Project = projecttodo.Project
}


Project.create = function ( newPro, result ) {

    console.log( 'model', newPro );

    dbConn.query('INSERT INTO Projects set ?', newPro, function ( err, res ) {

        if ( err ) {
            console.log( 'error: ', err );
            result( err, null );
        } else {
            console.log( res );
            result( null, res );
        }

    });

}

ProjectToDo.create = function ( newToDo, result ) {

    console.log( 'model', newTodo );

    dbConn.query('INSERT INTO ProjectToDo set ?', newToDo, function ( err, res ) {

        if ( err ) {
            console.log( 'error: ', err );
            result( err, null );
        } else {
            console.log( res );
            result( null, res );
        }

    });

} 


ProjectToDo.updateDone = function ( id, result ) {

    console.log( id );

    dbConn.query('SELECT * FROM ProjectToDo WHERE PTDID = ?', id, function ( err, res ) {
        
        if ( err ) {
            console.log( err );
            result( err, null )
        } else {

            dbConn.query('UPDATE ProjectToDo SET Done = ? WHERE PTDID = ?', [ !res[0].Done, id ], function ( e, r ) {

                if ( e ) {
                    console.log( e );
                    result( e, null );
                } else {
                    result( null, r );
                }

            });

        }

    })

}
