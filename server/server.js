const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Set mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', false);

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
    console.error('CRITICAL ERROR: DATABASE or DATABASE_PASSWORD environment variable is missing.');
    console.error('Please configure these Environment Properties in the Elastic Beanstalk console!');
} else {
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
        });
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
