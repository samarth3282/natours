const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Set mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', false);

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', DB.replace(process.env.DATABASE_PASSWORD, '***'));

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4, // Force IPv4
    })
    .then(() => {
        console.log('DB connection successful!');
    })
    .catch(err => {
        console.log('DB connection failed:', err.message);
        process.exit(1);
    });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
