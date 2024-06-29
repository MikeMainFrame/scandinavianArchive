
async function getList () {

  const buffer = await fetch( '/csv/x3050_CVR' );

  const resp = await buffer.text();

  const GROUP_KEY = 1;

  let tsvA = new TabSeparatedValuesIntoArray( resp, GROUP_KEY );

  document.body.appendChild( tsvA.tsvRC() );
}

getList();