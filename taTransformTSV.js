class TabSeparatedValuesIntoArray {

  constructor( tsvRaw, primeColumn ) {

    this.name = 'tabSeparatedValuesIntoArray ';
    this.tsvRaw = tsvRaw.split( '\x0D\x0A' );
    this.groupColumn = primeColumn;
    this.tsvSorted = [];
    this.tsvSortedSplit = [];

    let raw = this.tsvRaw;
    let names = raw.shift(); // do not sort heading names

    this.tsvSorted = raw.sort(
      ( a, b ) => {
        let current = a.split( '\x09' )[ this.groupColumn ];
        let previous = b.split( '\x09' )[ this.groupColumn ];
        if ( current > previous ) return 1;
        if ( current < previous ) return -1;
        return 0;
      }
    );

    this.tsvSorted.unshift( names ); // reenstate headline

    while ( this.tsvSorted.length > 0 ) {
      let line = this.tsvSorted.shift();
      this.tsvSortedSplit.push( line.split( '\x09' ) );
    }

    this.what( 'Succesfully transform ' );
  }
  what ( arg ) {
    console.log( this.name + " " + new Date().toISOString() + " " + arg );
  }
  giveMeData () {
    return this.tsvSortedSplit;
  }

  tsvCR ( slotNumbers ) {
    let tsvRows = this.tsvSortedSplit;
    let sheet = document.createElement( 'ta-table' );

    while ( slotNumbers.length > 0 ) {

      let col = slotNumbers.shift();

      let tarow = document.createElement( 'ta-row' );
      let cell = document.createElement( 'ta-cell' );

      for ( let row = 0; row < tsvRows.length; row++ ) {
        let occilate = 'ta-head';
        if ( row > 0 ) occilate = 'ta-cell';
        if (parseInt( tsvRows[ row ][ col ] ) ) occilate = 'ta-right';
        

        cell = document.createElement( occilate );
        cell.textContent = tsvRows[ row ][ col ];
        tarow.appendChild( cell );
      }

      sheet.appendChild( tarow );
    }

    this.what( 'tsvCR hmtl wrapped ' );
    return sheet;
  }
  tsvRC () {
    let tsvRows = this.tsvSortedSplit;
    let sheet = document.createElement( 'ta-table' );
    let cellType = 'ta-head';

    for ( let row = 0; row < tsvRows.length; row++ ) {

      let tarow = document.createElement( 'ta-row' );

      for ( let col = 0; col < tsvRows[ row ].length; col++ ) {

        let cell = document.createElement( cellType );
        cell.textContent = tsvRows[ row ][ col ];
        tarow.appendChild( cell );
      }

      cellType = 'ta-cell';
      sheet.appendChild( tarow );
    }

    this.what( 'tsvRC html wrapped ' );
    return sheet;
  }

  tsvSumma ( tsvRows, groupColumn, summaColumn ) {
    let A = [];
    let C = 0;
    for ( let row = 2; row < tsvRows.length; row++ ) {
      if ( tsvRows[ row - 1 ][ groupColumn ] === tsvRows[ row ][ groupColumn ] ) {
        C = C + parseInt( tsvRows[ row ][ summaColumn ] );
      } else {
        A.push( {
          name: tsvRows[ row - 1 ][ groupColumn ],
          sum: C
        } );
        C = parseInt( tsvRows[ row ][ summaColumn ] );
      }
    }
    A.push( {
      name: tsvRows[ tsvRows.length - 1 ][ groupColumn ],
      sum: C
    } );

    this.what( 'summa array with ' + A.length );
    return A;
  }

  tsv2fixed () {
    let tsvRows = this.tsvSortedSplit;
    let A = [];

    for ( let col = 0; col < tsvRows[ 0 ].length; col++ ) {
      let old = 0;
      for ( let row = 0; row < tsvRows.length - 1; row++ ) {
        if ( tsvRows[ row ][ col ].length > old ) {
          A[ col ] = {
            col: col,
            length: tsvRows[ row ][ col ].length
          };
          old = tsvRows[ row ][ col ].length;
        }
      }
    }

    for ( let row = 0; row < tsvRows.length; row++ ) {
      for ( let col = 0; col < tsvRows[ 0 ].length && tsvRows[ col ].length === tsvRows[ row ].length; col++ ) {
        let spaces = A[ col ].length + 2 - tsvRows[ row ][ col ].length;
        if ( parseInt( tsvRows[ row ][ col ] ) ) {
          tsvRows[ row ][ col ] = ' '.repeat( spaces ) + tsvRows[ row ][ col ] + ' ';
        } else tsvRows[ row ][ col ] = ' ' + tsvRows[ row ][ col ] + ' '.repeat( spaces );
      }
    }
    this.what( 'fixed length column ' );

    return tsvRows;
  }
}