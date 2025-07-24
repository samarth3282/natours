const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// Load environment variables
dotenv.config({ path: './config.env' });

// Replace <PASSWORD> in connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB Atlas
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,        // ✅ Optional in latest Mongoose (may show warning in future)
    useFindAndModify: false      // ✅ Optional in latest Mongoose (may show warning in future)
  })
  .then(() => console.log('DB CONNECTION SUCCESSFUL'))
  .catch(err => {
    console.error('DB CONNECTION FAILED ❌', err);
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
