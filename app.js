const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('./swagger.js');
const fetch = require('node-fetch');
const { sorting } = require('./utils/sorting');
const app = express();

let transactionsData;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.get('/transactions', (req, res) => {
  // Filtering
  if (req.query) {
    let filteredData = transactionsData;
    if (req.query.isCredit) {
      filteredData = transactionsData.filter((trx) => {
        return trx.isCredit === (req.query.isCredit == 'true');
      });
    }

    if (req.query.sortBy && req.query.orderBy) {
      filteredData = sorting(filteredData, req.query.sortBy, req.query.orderBy);
    }
    return res.send(filteredData);
  }

  return res.send(transactionsData);
});

app.get('/transactions/:id', (req, res) => {
  return res.send(
    transactionsData.find((trx) => trx.id == Number(req.params.id))
  );
});

app.patch('/transactions/:id/notes', (req, res) => {
  transactionsData.forEach((trx) => {
    if (trx.id === Number(req.params.id)) {
      trx.notes = req.body.notes;
    }
  });
  res.send(transactionsData);
});

app.listen(3000, async () => {
  console.info('App listening...');
  console.info('Initializing Data...');
  await fetch(
    'https://m1-production-client-assets.s3.amazonaws.com/project-data/transactions-v1.json'
  )
    .then((response) => response.json())
    .then((data) => {
      transactionsData = data.transactions;
      console.info('Data initialized ');
    })
    .catch((err) => console.error('Error initializing the data: ', err));
});
