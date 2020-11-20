const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('./swagger.js');
const fetch = require('node-fetch');
const app = express();

let transactionsData;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.get('/transactions', async (req, res) => {
  // Filtering
  if (req.query) {
    let filteredData = transactionsData;
    if (req.query.isCredit !== undefined) {
      filteredData = transactionsData.filter((trx) => {
        return trx.isCredit === (req.query.isCredit == 'true');
      });
    }

    if (req.query.sortBy && req.query.orderBy) {
      filteredData = await filteredData.sort((a, b) => {
        const { sortBy, orderBy } = req.query;
        if (sortBy === 'date') {
          return orderBy == 'DESC'
            ? new Date(b[sortBy]) - new Date(a[sortBy])
            : new Date(a[sortBy]) - new Date(b[sortBy]);
        } else {
          return orderBy == 'DESC'
            ? b[sortBy] - a[sortBy]
            : a[sortBy] - b[sortBy];
        }
      });
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

app.listen(3000, () => {
  console.info('App listening...');
  console.info('Initializing Data...');
  fetch(
    'https://m1-production-client-assets.s3.amazonaws.com/project-data/transactions-v1.json'
  )
    .then((response) => response.json())
    .then((data) => {
      transactionsData = data.transactions;
      console.info('Data initialized ');
    })
    .catch((err) => console.error('Error initializing the data: ', err));
});
