@echo off
taskkill /F /IM chrome.exe

start "Chrome" chrome "file:%~dp0index.html" --allow-file-access-from-files --incognito --kiosk 


