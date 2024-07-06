class rouletteSingleZero {
  constructor( anchor ) {
    this.name = 'Roulette36';
    this.anchor = anchor;
    this.iid = 0;
    this.counter = 1;
    this.elapsed = 0;
    this.prev = 0;
    this.no = 0;


    var jx = 1,
      ix = 1,
      kx = 0,
      X = 0,
      Y = 0,
      d = "",
      r900 = 900,
      r1000 = 1000,
      qPoint = 1003,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      qx = 1870,
      qy = 100,
      rx = 1000,
      ry = 1000,
      pair = [ 0, 2, 14, 35, 23, 4, 16, 33, 21, 6, 18, 31, 19, 8, 12, 29, 25, 10, 27, 1, 13, 36, 24, 3, 15, 34, 22, 5, 17, 32, 20, 7, 11, 30, 26, 9, 28 ],
      color = [
        '#0a0', '#a00',
        '#222', '#a00',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00', '#222',
        '#a00'
      ]


    var gSlots = document.createElementNS( "http://www.w3.org/2000/svg", 'g' );
    var gMatrix = document.createElementNS( "http://www.w3.org/2000/svg", 'g' );
    var gText = document.createElementNS( "http://www.w3.org/2000/svg", 'g' );

    while ( ix < 360 ) {
      var path = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
      X = this.polarToCartesian( ix ).x
      Y = this.polarToCartesian( ix ).y
      d = "M" + parseInt( 1000 + ( X * r900 ) ) + ', ' + parseInt( 1000 + ( Y * r900 ) );
      d += " L" + parseInt( 1000 + ( X * r1000 ) ) + ', ' + parseInt( 1000 + ( Y * r1000 ) );


      X = this.polarToCartesian( ix + 6 ).x
      Y = this.polarToCartesian( ix + 6 ).y

      tx = 1000 + ( X * 930 ), ty = 1000 + ( Y * 930 );

      d += " Q" + parseInt( 1000 + ( X * qPoint ) ) + ', ' + parseInt( 1000 + ( Y * qPoint ) );
      X = this.polarToCartesian( ix + 9.5 ).x
      Y = this.polarToCartesian( ix + 9.5 ).y

      cx = 1000 + ( X * 930 ), cy = 1000 + ( Y * 930 );

      d += "  " + parseInt( 1000 + ( X * r1000 ) ) + ', ' + parseInt( 1000 + ( Y * r1000 ) );
      d += " L" + parseInt( 1000 + ( X * r900 ) ) + ', ' + parseInt( 1000 + ( Y * r900 ) );

      path.setAttribute( "id", 's' + pair[ kx ] );
      path.setAttribute( "fill", color[ kx ] );
      path.setAttribute( "opacity", 0.4 );
      path.setAttribute( "d", d + ' Z' );

      var text = document.createElementNS( "http://www.w3.org/2000/svg", 'text' );
      text.setAttribute( "fill", "#fff" );
      text.setAttribute( "font-size", 48 );
      text.setAttribute( "text-anchor", 'end' );
      text.setAttribute( "transform", "rotate(" + ( ix + 7 ) + " " + tx + " " + ty + ")" );
      text.setAttribute( "x", tx );
      text.setAttribute( "y", ty );

      text.textContent = pair[ kx ];

      var circle = document.createElementNS( "http://www.w3.org/2000/svg", 'circle' );

      X = this.polarToCartesian( ix + 5 ).x
      Y = this.polarToCartesian( ix + 5 ).y

      cx = 1000 + ( X * 900 ), cy = 1000 + ( Y * 900 );

      circle.setAttribute( "cx", cx )
      circle.setAttribute( "cy", cy )
      circle.setAttribute( "r", 12 )
      circle.setAttribute( "fill", "none" )
      circle.setAttribute( "stroke", "none" )
      circle.setAttribute( "id", 'c' + pair[ kx ] );

      gSlots.appendChild( path );
      gSlots.appendChild( circle );
      gText.appendChild( text );
/*
right side
*/
      var rect = document.createElementNS( "http://www.w3.org/2000/svg", 'rect' );

      rect.setAttribute( "x", qx );
      rect.setAttribute( "y", qy )
      rect.setAttribute( "width", 124 )
      rect.setAttribute( "height", 124 )
      rect.setAttribute( "fill", color[ kx ] )

      var text = document.createElementNS( "http://www.w3.org/2000/svg", 'text' );
      text.setAttribute( "fill", "#fff" );
      text.setAttribute( "font-size", 48 );
      text.setAttribute( "text-anchor", 'middle' );
      text.setAttribute( "x", qx + 62 );
      text.setAttribute( "y", qy + 72 );
      text.textContent = kx;

      if ( kx > 0 ) {
        gMatrix.appendChild( rect )
        gMatrix.appendChild( text )
      }

      ix = ix + 9.72972972973;

      kx++;

      if ((kx - 1) % 3 === 0 ) {
        qx = 2000
        qy = qy + 130
      } else {
        qx = qx + 130
      }
    }

    var rect = document.createElementNS( "http://www.w3.org/2000/svg", 'rect' );

    rect.setAttribute( "x", 2000 );
    rect.setAttribute( "y", 100 )
    rect.setAttribute( "width", 390 )
    rect.setAttribute( "height", 124 )
    rect.setAttribute( "fill", "#0A0" )

    var text = document.createElementNS( "http://www.w3.org/2000/svg", 'text' );
    text.setAttribute( "fill", "#fff" );
    text.setAttribute( "font-size", 48 );
    text.setAttribute( "text-anchor", 'middle' );
    text.setAttribute( "x", 2200 );
    text.setAttribute( "y", 174 );
    text.textContent = 0;

    gMatrix.setAttribute( "opacity", 0.4 );
    gMatrix.appendChild( rect )
    gMatrix.appendChild( text )

    document.getElementById( this.anchor ).appendChild( gSlots );
    document.getElementById( this.anchor ).appendChild( gText );
    document.getElementById( this.anchor ).appendChild( gMatrix );
  }
  polarToCartesian( angleInDegrees ) {
    var angleInRadians = ( ( angleInDegrees - 90 ) * Math.PI ) / 180.0;

    return {
      x: Math.cos( angleInRadians ),
      y: Math.sin( angleInRadians ),
    };
  }

  motion() {
    this.prev = this.no;
    this.no = this.getRnd_0_36( 0, 36 )
    document.getElementById( "s" + this.prev ).setAttribute( "opacity", "0.4" );
    document.getElementById( "s" + this.no ).setAttribute( "opacity", "0.9" );
    document.getElementById( "c" + this.no ).setAttribute( "fill", "#fff" );

    zstatus.textContent = this.no;
  }
  getRnd_0_36( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  }
  start() {
    setTimeout( () => {
      clearInterval( this.iid );
    }, 12000 );
    this.iid = setInterval( this.motion.bind( this ), 12000 / 37 );
  }
}