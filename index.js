const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./server/routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

app.listen(port, (error) => {
  if (error) {
    console.log(`There was a problem: ${error}`);
    return;
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
