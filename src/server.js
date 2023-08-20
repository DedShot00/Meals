require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

//* database autentication
db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log(err);
  });

//* initialize table relations
initModel()

//* database synchronization
db.sync()
  .then(() => {
    console.log('Database synchronized...');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
