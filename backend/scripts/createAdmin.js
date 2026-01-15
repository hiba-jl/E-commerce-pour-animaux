const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/createAdmin.js email@example.com');
    process.exit(1);
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    console.error('Utilisateur non trouvé');
    process.exit(1);
  }
  
  user.role = 'admin';
  await user.save();
  console.log(`✅ L'utilisateur ${email} est maintenant administrateur !`);
  console.log('Déconnectez-vous et reconnectez-vous pour voir l\'onglet Admin.');
  process.exit(0);
})
.catch(err => {
  console.error('Erreur:', err.message);
  process.exit(1);
});

