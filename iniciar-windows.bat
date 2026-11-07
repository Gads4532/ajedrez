@echo off
REM Abre Ajedrez Pro Academia en tu navegador (necesita Python instalado: https://www.python.org)
cd /d "%~dp0"
start "" http://localhost:8080/index.html
python -m http.server 8080 || py -m http.server 8080
