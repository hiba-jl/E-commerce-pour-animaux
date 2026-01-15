# Installation de Node.js - Étapes nécessaires

## ⚠️ Node.js n'est pas installé sur votre système

Pour lancer l'application, vous devez d'abord installer Node.js.

## 📥 Installation de Node.js

### Option 1 : Téléchargement direct (Recommandé)

1. **Aller sur le site officiel** : https://nodejs.org/
2. **Télécharger la version LTS** (Long Term Support)
   - Pour Windows : cliquer sur le bouton vert "LTS"
   - Cela téléchargera un fichier `.msi`
3. **Installer Node.js** :
   - Double-cliquer sur le fichier téléchargé
   - Suivre l'Assistant d'installation
   - ✅ **Important** : Cochez l'option "Add to PATH" (ajouter au PATH)
   - Cliquer sur "Install"
4. **Redémarrer votre terminal/PowerShell** après l'installation

### Option 2 : Via Chocolatey (si installé)

```powershell
choco install nodejs
```

### Option 3 : Via winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ Vérifier l'installation

Après l'installation, **fermez et rouvrez votre terminal**, puis testez :

```bash
node --version
npm --version
```

Vous devriez voir des numéros de version (ex: v18.17.0 et 9.6.7)

## 🚀 Après l'installation de Node.js

Une fois Node.js installé, vous pourrez :

1. **Installer les dépendances du backend** :
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Installer les dépendances du frontend** :
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📝 Note importante

- **Redémarrez votre terminal** après l'installation de Node.js
- Si `node` ou `npm` n'est toujours pas reconnu après redémarrage, vérifiez que Node.js est dans votre PATH système
- Vous pouvez vérifier dans les variables d'environnement Windows :
  - Recherchez "Variables d'environnement" dans Windows
  - Vérifiez que le chemin vers Node.js est dans "Path"

## 🆘 Besoin d'aide ?

Si vous avez des problèmes :
1. Réinstallez Node.js en cochant toutes les options
2. Redémarrez complètement votre ordinateur
3. Vérifiez que le chemin `C:\Program Files\nodejs\` existe

Une fois Node.js installé, revenez et nous lancerons l'application ! 🎉



