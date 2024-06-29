'use strict';
const { Storage } = require( '@google-cloud/storage' );
const https = require( 'node:http' );
const fs = require( 'node:fs' );
const path = require( 'node:path' );
const process = require( 'node:process' );
const stream = require( 'node:stream' );
let pileUp = [];

https.createServer().on( 'request', processRequest ).listen( 3000 );

async function processRequest ( request, response ) {

  request.on( 'data', collectIncomingPOST );
  request.on( 'end', executeRequest );
  request.on( 'error', messageStdOut );

  response.on( 'close', messageStdOut.bind( this, 'f*ck' ) );
  response.on( 'error', messageStdOut );

  response.statusCode = 200; // until trouble we assume ok ...
  response.statusMessage = 'All Good';
  response.setEncoding = ( 'utf8' );

  const reqURL = new URL( 'https://localhost:3000/' + request.url );

  async function executeRequest () {

    if ( pileUp.length > 0 ) messageStdOut( Buffer.concat( pileUp ).toString() ); // end wire - must connect to real storage

    messageStdOut( `REQUEST: ${request.method}  ${reqURL}` );

    const file = path.join( __dirname, reqURL.pathname );

    /* check for domestic file if no exixtence, try cloud
    if not file request, then try various end points
    */
    if ( file.split( '.' ).length === 2 ) {
      fs.createReadStream( file )
        .on( 'error',
          async ( msg ) => {

            messageStdOut( 'readfile ' + file + msg );
            const storage = new Storage();
            const S = await storage.bucket( 'triticumarchives' ).file( 'IBM/' + file );
            S.createReadStream()
              .on( 'error', ( err ) => {

                messageStdOut( 'read API ' + file + err );
                response.statusCode = 404;
                response.end( '<h1>Problems ' + file + '</h1>', 'utf-8' );
              } )
              .pipe( response );
          } )
        .pipe( response );

    } else {

      switch ( reqURL.pathname ) {

        case '//IBM/files': await dofileBuckets(); break;
        case '//csv/x3050_CVR': await doClosedPositions(); break;
        default: response.end( '<h1>Problems ' + reqURL + '</h1>', 'utf-8' );
      }

    }
    async function doClosedPositions ( file ) {

      const storage = new Storage();
      const S = await storage.bucket( 'triticumarchives' ).file( 'csv/x3050_CVR.tsv' );

      S.createReadStream()
        .on( 'error',
          ( err ) => {
            console.log( err );
            response.statusCode === 404;
            response.end( '<h1>Problems ' + fileBucket + ' | ' + err + '</h1>', 'utf-8' );
          } )
        .pipe( response );

    }
    async function dofileBuckets () {

      let lines = [];
      const storage = new Storage();
      const [ fileObjects ] = await storage.bucket( 'triticumarchives' ).getFiles( { prefix: 'IBM' } );


      for ( let jx = 0; jx < fileObjects.length; jx++ ) {
        const F = fileObjects[ jx ];
        lines.push( `${F.name}\t${F.metadata.updated}\t${F.metadata.timeCreated}\t${F.metadata.size}\t${F.metadata.generation}\t${F.metadata.bucket}\r\n` );
      }

      response.setHeader( 'Content-Type', 'application/json' );
      response.write( lines.join( '' ) );
      response.statusCode = 200;
      response.statusMessage = 'data extracted';
      response.end();

    }
  }
}

function collectIncomingPOST ( streamBytes ) {

  pileUp.push( streamBytes );

  return;
}

function messageStdOut ( what ) {

  process.stdout.write( new Date().toISOString() + ' ' + what + '\r\n' );

  return;
}