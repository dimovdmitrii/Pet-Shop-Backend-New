@echo off
chcp 65001
echo Deploying with Neon driver...
git add .
git commit -m "Switch to Neon serverless driver"
git push
echo Deployment completed!
pause
