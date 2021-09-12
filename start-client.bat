setlocal
cd /d %~dp0
cd web/dist/web
http-server -a localhost -p 4200 -c-1 -o