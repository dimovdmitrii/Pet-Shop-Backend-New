@echo off
chcp 65001
echo Deploying to Vercel...
git add .
git commit -m "Fix PostgreSQL connection for Vercel"
git push
echo Deployment completed!
pause
