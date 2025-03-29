// Run once to create/update admin
const User = require('./models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const username = 'adminuser';
    const email = 'admin@gmail.com';
    const password = 'adminpassword';

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        password,
        confirmPassword: password,
        role: 'admin'
      });
    } else {
      user.username = username;
      user.password = password;
      user.confirmPassword = password;
      user.role = 'admin';
    }

    await user.save();
    console.log('✅ Admin user created/updated');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
