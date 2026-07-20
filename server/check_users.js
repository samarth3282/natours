const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config({ path: './.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(async () => {
    console.log('DB connection successful!');
    const count = await User.countDocuments();
    console.log(`Total users in DB: ${count}`);
    if (count > 0) {
        const user = await User.findOne();
        console.log(`Sample user email: ${user.email}`);
    }
    process.exit();
}).catch(err => {
    console.log(err);
    process.exit(1);
});
