const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const appRouter = require('./routes/index.routes');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(compression());
app.use(cors());
app.use(helmet());

app.use('/api', appRouter);

app.listen(port, () => {
  console.log(`app started on localhost:${port}`);
});

module.exports = app;
