# Guide de configuration

## Configuration MongoDB

### Option 1: MongoDB Local

1. Installer MongoDB sur votre machine
2. Démarrer MongoDB:
   ```bash
   # Windows
   mongod
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

3. Dans le fichier `backend/.env`, utiliser:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Obtenir la chaîne de connexion
4. Dans le fichier `backend/.env`, utiliser:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

## Créer un utilisateur Admin

Après avoir créé un compte utilisateur normal via l'interface web, vous pouvez le promouvoir administrateur via MongoDB:

### Méthode 1: Via MongoDB Shell

```bash
# Se connecter à MongoDB
mongo

# Utiliser la base de données
use ecommerce

# Mettre à jour l'utilisateur
db.users.updateOne(
  { email: "votre-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Méthode 2: Via MongoDB Compass

1. Ouvrir MongoDB Compass
2. Se connecter à votre base de données
3. Naviguer vers la collection `users`
4. Trouver votre utilisateur par email
5. Modifier le champ `role` de `"user"` à `"admin"`

### Méthode 3: Script Node.js (optionnel)

Créez un fichier `backend/scripts/createAdmin.js`:

```javascript
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
  console.log(`L'utilisateur ${email} est maintenant administrateur`);
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
```

Puis exécutez:
```bash
cd backend
node scripts/createAdmin.js votre-email@example.com
```

## Démarrage rapide

1. **Backend:**
   ```bash
   cd backend
   npm install
   # Créer le fichier .env avec les variables d'environnement
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Accéder à l'application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Première utilisation

1. Créer un compte utilisateur via l'interface
2. Promouvoir ce compte en admin (voir ci-dessus)
3. Se déconnecter et reconnecter
4. L'onglet "Admin" apparaîtra dans la navbar
5. Accéder au tableau de bord admin pour gérer les produits


