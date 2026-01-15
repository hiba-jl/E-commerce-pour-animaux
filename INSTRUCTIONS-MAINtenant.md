# 🚀 Instructions pour lancer l'application MAINTENANT

## ✅ Option 1 : Utiliser le script automatique (RECOMMANDÉ)

**Double-cliquez sur le fichier : `DEMARRER-APPLICATION.bat`**

Ce script va :
1. ✅ Vérifier que Node.js est installé
2. ✅ Installer les dépendances du backend
3. ✅ Démarrer le serveur backend
4. ✅ Installer les dépendances du frontend  
5. ✅ Démarrer le serveur frontend
6. ✅ Ouvrir votre navigateur automatiquement

---

## 📝 Option 2 : Lancer manuellement (si le script ne fonctionne pas)

### **Terminal 1 - Backend :**

Ouvrez un **PowerShell** ou **CMD** et exécutez :

```bash
cd C:\Users\sselm\OneDrive\Desktop\NosqlProject\backend
npm install
npm run dev
```

✅ Vous devriez voir : "MongoDB Connected" et "Server running on port 5000"

### **Terminal 2 - Frontend :**

Ouvrez un **NOUVEAU PowerShell** ou **CMD** et exécutez :

```bash
cd C:\Users\sselm\OneDrive\Desktop\NosqlProject\frontend
npm install
npm start
```

✅ Votre navigateur s'ouvrira automatiquement sur http://localhost:3000

---

## ⚠️ Si Node.js n'est toujours pas reconnu

### Dans un terminal Windows (CMD ou PowerShell) normal :

1. Ouvrez **CMD** ou **PowerShell** (pas celui de Cursor)
   - Appuyez sur `Win + R`
   - Tapez `cmd` et appuyez sur Entrée

2. Testez Node.js :
   ```bash
   node --version
   npm --version
   ```

3. Si ça fonctionne dans CMD mais pas dans Cursor :
   - **Fermez complètement Cursor**
   - **Redémarrez Cursor**
   - Utilisez le script `DEMARRER-APPLICATION.bat` à la place

---

## 🎯 Après le démarrage

1. **Vérifiez MongoDB** : Assurez-vous que MongoDB est démarré
   - Si installé localement, MongoDB devrait démarrer automatiquement
   - Sinon, lancez `mongod` dans un terminal

2. **Accédez à l'application** :
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:5000/api

3. **Créez un compte** via l'interface web

4. **Créez un admin** (voir SETUP.md pour les instructions)

---

## ❓ Besoin d'aide ?

- Consultez `INSTRUCTIONS-DEMARRAGE.txt`
- Consultez `LANCEMENT.md`
- Vérifiez que MongoDB est démarré

**Essayez d'abord le script `DEMARRER-APPLICATION.bat` !** 🎉


