@echo off
chcp 65001
echo Deploying debug version with logging...
git add .
git commit -m "Add debug logging to API routes and fix Neon initialization"
git push
echo Deployment completed!
pause
