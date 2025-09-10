@echo off
chcp 65001
echo Final fix: using correct Categories and Products tables with proper column names...
git add .
git commit -m "Final fix: use Categories and Products tables with correct column names (title as name)"
git push
echo Deployment completed!
pause
