@echo off
chcp 65001
echo Deploying version with detailed debug logging...
git add .
git commit -m "Add detailed debug logging to categories endpoint"
git push
echo Deployment completed!
pause
