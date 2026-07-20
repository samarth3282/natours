const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION! 💥');
    console.error(err.name, err.message, err.stack);
});

process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION! 💥');
    console.error(err.name, err.message, err.stack);
});

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

// Elastic Beanstalk AL2023 Nginx proxies to 8080 by default. 
// We will listen on BOTH 8080 and 3000 to absolutely guarantee Nginx can reach the app, 
// regardless of whether the user set NODE_ENV=production or PORT=3000 manually!
// We MUST explicitly bind to 0.0.0.0 because Node 24 might default to IPv6 (::) which breaks Nginx proxying to 127.0.0.1!
app.listen(8080, '0.0.0.0', () => {
    console.log(`App running on port 8080 (For Elastic Beanstalk)...`);
});
app.listen(3000, '0.0.0.0', () => {
    console.log(`App running on port 3000 (For Local Development)...`);
});
