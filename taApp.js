
async function getList () {

  const buffer = await fetch( '/IBM/files' );

  const resp = await buffer.text();

  const GROUP_KEY = 1;

  let tsvA = new TabSeparatedValuesIntoArray( resp, GROUP_KEY );

  // document.body.appendChild( tsvA.tsvCR([3,1,2,8,9,10,11,12]) );
  document.body.appendChild( tsvA.tsvCR( [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9  ] ) );
}
getList();

//let temp = new rouletteSingleZero('svg');
//temp.start();