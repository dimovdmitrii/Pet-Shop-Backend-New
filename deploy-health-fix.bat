@echo off
chcp 65001
echo Deploying health check fix...
git add .
git commit -m "Fix health check to not return 500 error when sql is null"
git push
echo Deployment completed!
pause
