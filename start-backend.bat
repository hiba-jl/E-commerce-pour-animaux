@echo off
echo ====================================
echo    Lancement du Backend
echo ====================================
cd backend
if not exist node_modules (
    echo Installation des dependances...
    call npm install
)
echo.
echo Demarrage du serveur backend...
echo Le serveur sera accessible sur http://localhost:5000
echo.
call npm run dev
pause



