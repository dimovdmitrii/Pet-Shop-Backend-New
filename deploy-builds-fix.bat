@echo off
chcp 65001
echo Fixing Vercel builds configuration...
git add .
git commit -m "Fix vercel.json: use builds instead of functions for root index.js"
git push
echo Deployment completed!
pause
