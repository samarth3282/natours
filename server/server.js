const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION! 💥');
    console.error(err.name, err.message, err.stack);
});

process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION! 💥');
    console.error(err.name, err.message, err.stack);
});

async function fetchSecrets() {
    if (process.env.NODE_ENV === 'production') {
        const secretName = process.env.SECRET_NAME || 'natours-backend-secrets';
        const region = process.env.AWS_REGION || 'us-east-1';

        console.log(`Fetching secrets from AWS Secrets Manager (Secret: ${secretName}, Region: ${region})...`);
        const client = new SecretsManagerClient({ region });
        
        try {
            const response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secretName,
                })
            );
            
            if (response.SecretString) {
                const secrets = JSON.parse(response.SecretString);
                for (const key in secrets) {
                    process.env[key] = secrets[key];
                }
                console.log('Secrets successfully loaded into environment variables.');
            }
        } catch (error) {
            console.error('Failed to fetch secrets from AWS Secrets Manager:', error);
        }
    } else {
        dotenv.config({ path: './config.env' });
    }
}

async function startServer() {
    // Fetch secrets before doing anything else
    await fetchSecrets();

    // Now we can require app safely
    const app = require('./app');

    // Set mongoose strictQuery option to suppress deprecation warning
    mongoose.set('strictQuery', false);

    if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
        console.error('CRITICAL ERROR: DATABASE or DATABASE_PASSWORD environment variable is missing.');
        console.error('Please configure these in Secrets Manager or .env!');
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

    // Elastic Beanstalk AL2023 / EC2 Nginx proxy usually uses 8080
    app.listen(8080, '0.0.0.0', () => {
        console.log(`App running on port 8080 (For EC2/Production)...`);
    });
    app.listen(3000, '0.0.0.0', () => {
        console.log(`App running on port 3000 (For Local Development)...`);
    });
}

startServer();
