#!/bin/sh
# Abre Ajedrez Pro Academia en tu navegador (necesita Python 3).
cd "$(dirname "$0")"
( sleep 1; (xdg-open http://localhost:8080/index.html || open http://localhost:8080/index.html) >/dev/null 2>&1 ) &
python3 -m http.server 8080
