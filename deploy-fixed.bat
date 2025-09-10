@echo off
chcp 65001
echo Deploying fixed version with mock data support...
git add .
git commit -m "Fix API with mock data support for development"
git push
echo Deployment completed!
pause
