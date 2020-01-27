const express = require('express');
const A = express();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
var pre = "";

A.use('/static', express.static('public'));

A.use('/mailreplies', async (ø, response) => {

  (async function listFiles() {
    const [files] = await storage.bucket('triticum').getFiles({
      autoPaginate: false,
      delimiter: '/',
      prefix: 'SMTP/'
    });

    var data = '';

    files.forEach((slot, noOfSlots) => {
      var mail = slot.createReadStream();
      mail
        .on('data', (fragment) => { data = data + fragment })
        .on('end', () => {
          pre = pre + data; if ((noOfSlots + 1) === files.length) response.send('sandboxing ready')
        });
    });
  })();

})

A.get('/library/*', async (request, response) => {

  getBFD(request.path);
  
  async function getBFD (what) {
    var article = await storage.bucket('triticum').file('ARTICLES' + what + ".html")
    var aggregate = article.createReadStream();
    var data = "";

    aggregate
      .on('data', (fragment) => { data = data + fragment })
      .on('end', () => { response.send(data) });
  }

})

A.use('/library', async (ø, response) => {

  (async function listFiles() {
    const [files] = await storage.bucket('triticum').getFiles({
      autoPaginate: false,
      delimiter: '/',
      prefix: 'ARTICLES/library/'
    });

    response.send(JSON.stringify(files));

  })()

});

A.use('/mail', async (ø, response) => {

  var M = await getURL('http://storage.googleapis.com/triticum/CMS/taMail.html');
  var J = await getURL('http://storage.googleapis.com/triticum/CMS/taMailDistribution.json');

  send(M, JSON.parse(J));

  function send(M, list) {

    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    response.send(M);

    list.forEach(slot => {
      const msg = {
        to: slot.mail,
        from: 'motherfucker@hansolo.appspotmail.com',
        subject: '★  T R I T I C U M   ★   A R C H I V E S  ★',
        text: 'raw',
        html: M
      };
      sgMail.send(msg);
    })
  }

  async function getURL(what) {

    const http = require('http');
    var data = "";
    return new Promise(function (continueWith) {
      http.get(what, (R) => {
        var data = '';
        R.on('data', (fragment) => { data = data + fragment });
        R.on('end', () => { continueWith(data) });
      }).on('error', (E) => { console.error(E.message) });
    })
  }
})

A.get('/sandboxing', (ø, response) => {
  response.set('Content-Type', 'text/html; charset=UTF-8');
  response.send(pre)
});

A.listen((process.env.PORT || 8080), () => {
  console.log('All ears, Press Ctrl+C to quit.');
});
