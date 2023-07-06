@echo off
taskkill /F /IM chrome.exe

start "Chrome" chrome "file:%~dp0index.html#/PPL-CH-ICT03" --kiosk --disable-infobars --allow-file-access-from-files --incognito --kiosk --disable-direct-write


