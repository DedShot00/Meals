const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//* routes imports
const usersRoute = require('./routes/users.route')

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log(process.env.NODE_ENV)

//* routes
app.use('/api/v1/users',usersRoute)
app.use('api/v1/restaurants',() => {  })
app.use('api/v1/meals',() => {  })
app.use('api/v1/orders',() => {  })

app.use(globalErrorHandler)

module.exports = app