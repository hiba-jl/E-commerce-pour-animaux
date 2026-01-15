@echo off
echo ====================================
echo   DEMARRAGE DE L'APPLICATION E-COMMERCE
echo ====================================
echo.

echo Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERREUR: Node.js n'est pas installe ou pas dans le PATH
    echo.
    echo Veuillez:
    echo 1. Installer Node.js depuis https://nodejs.org/
    echo 2. Redemarrer votre ordinateur
    echo 3. Relancer ce script
    echo.
    pause
    exit /b 1
)

echo Node.js detecte!
echo.

echo ====================================
echo   ETAPE 1: BACKEND
echo ====================================
cd backend

if not exist node_modules (
    echo Installation des dependances backend...
    call npm install
    if errorlevel 1 (
        echo ERREUR lors de l'installation des dependances backend
        pause
        exit /b 1
    )
)

echo.
echo Demarrage du serveur backend...
echo Le backend sera accessible sur http://localhost:5000
echo.
start "Backend - Port 5000" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo ====================================
echo   ETAPE 2: FRONTEND
echo ====================================
cd ..\frontend

if not exist node_modules (
    echo Installation des dependances frontend...
    call npm install
    if errorlevel 1 (
        echo ERREUR lors de l'installation des dependances frontend
        pause
        exit /b 1
    )
)

echo.
echo Demarrage du serveur frontend...
echo Le navigateur va s'ouvrir sur http://localhost:3000
echo.
start "Frontend - Port 3000" cmd /k "npm start"

echo.
echo ====================================
echo   APPLICATION DEMARRREE!
echo ====================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Les fenetres du backend et frontend sont ouvertes
echo Fermez cette fenetre quand vous avez termine
echo.
pause

