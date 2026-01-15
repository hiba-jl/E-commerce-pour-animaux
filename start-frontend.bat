@echo off
echo ====================================
echo    Lancement du Frontend
echo ====================================
cd frontend
if not exist node_modules (
    echo Installation des dependances...
    call npm install
)
echo.
echo Demarrage du serveur frontend...
echo Le navigateur va s'ouvrir automatiquement sur http://localhost:3000
echo.
call npm start
pause



