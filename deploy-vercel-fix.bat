@echo off
chcp 65001
echo Fixing Vercel configuration conflict...
git add .
git commit -m "Fix vercel.json: remove conflicting builds and functions configuration"
git push
echo Deployment completed!
pause
