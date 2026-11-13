@echo off
REM Inicia a API (JSON Server) e o front-end (Vite) em duas janelas.
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)
start "GearUp - API" cmd /k npm run server
start "GearUp - App" cmd /k npm run dev
