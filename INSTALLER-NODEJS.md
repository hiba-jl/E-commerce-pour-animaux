# 📥 Installer Node.js sur Windows

## 🎯 MÉTHODE 1 : Via winget (Windows 10/11 - RECOMMANDÉ)

Ouvrez PowerShell en tant qu'**administrateur** et exécutez :

```powershell
winget install OpenJS.NodeJS.LTS
```

Après l'installation, **fermez et rouvrez** votre terminal.

---

## 🎯 MÉTHODE 2 : Via Chocolatey (si installé)

Si vous avez Chocolatey installé, ouvrez PowerShell en tant qu'**administrateur** :

```powershell
choco install nodejs-lts
```

Après l'installation, **fermez et rouvrez** votre terminal.

---

## 🎯 MÉTHODE 3 : Téléchargement manuel (MÉTHODE LA PLUS SÛRE)

### Étape 1 : Télécharger
1. Allez sur : **https://nodejs.org/**
2. Cliquez sur le bouton vert **"LTS"** (Long Term Support)
3. Le fichier `.msi` se téléchargera (ex: `node-v20.11.0-x64.msi`)

### Étape 2 : Installer
1. Double-cliquez sur le fichier `.msi` téléchargé
2. Cliquez sur **"Next"** dans l'assistant
3. Acceptez la licence
4. **Important** : Laissez coché "Add to PATH" (généralement coché par défaut)
5. Cliquez sur **"Install"**
6. Attendez la fin de l'installation
7. Cliquez sur **"Finish"**

### Étape 3 : Vérifier
**Fermez complètement tous les terminaux** et rouvrez-en un nouveau, puis :

```bash
node --version
npm --version
```

Vous devriez voir des numéros de version (ex: `v20.11.0` et `10.2.4`)

---

## ✅ Après l'installation

1. **Fermez tous les terminaux** (y compris Cursor)
2. **Redémarrez Cursor**
3. **Ouvrez un nouveau terminal**
4. Testez : `node --version`

---

## 🆘 Vérifier si winget est disponible

Pour vérifier si winget fonctionne, ouvrez PowerShell et tapez :

```powershell
winget --version
```

Si cela fonctionne, utilisez la Méthode 1. Sinon, utilisez la Méthode 3 (téléchargement manuel).


