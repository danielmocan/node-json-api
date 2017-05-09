const fs = require( "fs" );

function loadData( ) {
    const readable = fs.readFileSync("./db.json");
    const database = JSON.parse( readable.toString() );
    return database;
}

function saveData( data ) {
    fs.writeFileSync("./db.json", JSON.stringify( data, null, 2 ), 'utf8' );
}

function extractParams( req ) {
    return {
        category: req.params.category,
        id: req.params.id
    }
}

function notFound( res ) {
   return res.status( 404 ).json( { error: "Record Not Found" } );
}

module.exports = {
    loadData,
    saveData,
    extractParams,
    notFound
}