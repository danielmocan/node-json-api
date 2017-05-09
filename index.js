const express = require( "express" );
const app = express();
const bodyParser = require( "body-parser" );
const utils = require( "./utils.js" );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json( ) );
app.use( function( req, res, next ) {
  res.header("Access-Control-Allow-Origin", "*");
  next( );
} );

app.get('/favicon.ico', ( req, res ) => {
  res.end( );
} );

app.get("/:category/:id?", ( req, res ) => {
    const { category, id } = utils.extractParams( req );
    const database = utils.loadData( );

    if( !database[ category ] ){
            return utils.notFound( res );
    }

    if( database[ category ] && !id ) {
        return res.json( database[ category ] );
    }

    const post = database[ category ].filter( ( item ) => item.id === id );
 
    if( post.length ) {
        return res.json( post );
    }
    return utils.notFound( res );
} );


app.post("/:category", ( req, res ) => {
    const { category } = utils.extractParams( req );
    const database = utils.loadData( );
    const id = database.id + 1;
    const objectToAdd = Object.assign( { }, req.body, { id } );

    if( !database[ category ] ){
        return utils.notFound( res );
    }

    if( database[category] ) {
        database[ category ].push( objectToAdd );
        database.id += 1;
        utils.saveData( database );

        return res.json( database[ category ] );
    }
    
    return utils.notFound( res );
} );

app.put("/:category/:id", ( req, res ) => {
    const { category, id } = utils.extractParams( req );
    const database = utils.loadData( );

    if( !category || !id ) {
        return utils.notFound( res );
    }

    if( database[ category ] ) {
        for( let i = 0; i < database[ category ].length; i++ ) {
            if( database[ category ][ i ].id == id ) {
                database[ category ][ i ] = Object.assign( { }, req.body, { id }  );
                utils.saveData( database );

                return res.json( { message: "success" } );
            }
        }
    }

    return utils.notFound( res );
} );

app.delete("/:category/:id", ( req, res ) => {
    const { category, id } = utils.extractParams( req );
    const database = utils.loadData( );

    if( !category || !id ) {
        return utils.notFound( res );
    }

    if( database[ category ] ) {
        for( let i = 0; i < database[ category ].length; i++ ) {
            if( database[ category ][ i ].id == id ) {
                database[ category ].splice( i, 1 );
                utils.saveData( database );

                return res.json( { message: "Delete successfully" } );
            }
        }
    }

    return utils.notFound( res );
} );

const server = app.listen( 3000, ( ) => {
    console.log( "Json Api running on port: " + server.address( ).port + ". Happy conding. " );
} );