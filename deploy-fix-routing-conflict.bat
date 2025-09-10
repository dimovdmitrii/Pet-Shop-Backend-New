@echo off
echo Fixing routing conflict between Express and Vercel...
git add index.js
git commit -m "Remove Express static routes to fix Vercel routing conflict"
git push
echo Deployment completed!
pause
