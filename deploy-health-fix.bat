@echo off
chcp 65001
echo Fixing health check to use correct table names...
git add .
git commit -m "Fix health check to use Categories and Products table names"
git push
echo Deployment completed!
pause