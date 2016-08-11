@echo off
taskkill /F /IM chrome.exe

start "Chrome" chrome "file:%~dp0index.html#/PPL-CR-ICT05" --allow-file-access-from-files --incognito --kiosk --disable-direct-write


