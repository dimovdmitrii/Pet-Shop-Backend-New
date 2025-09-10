@echo off
chcp 65001
echo Deploying project with images...
git add .
git commit -m "Add public folder with product and category images"
git push
echo Deployment completed!
pause
