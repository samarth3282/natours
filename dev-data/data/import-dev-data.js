const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const { log } = require('console');
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
        process.exit();

    } catch (err) {
        console.log(err);

    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv);
