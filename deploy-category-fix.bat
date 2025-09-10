@echo off
chcp 65001
echo Fixing category endpoint with correct field names...
git add .
git commit -m "Fix category endpoint to use correct createdAt and updatedAt field names"
git push
echo Deployment completed!
pause
