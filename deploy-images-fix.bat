@echo off
echo Deploying image routing fix...
git add vercel.json
git commit -m "Fix image routing with proper headers"
git push
echo Deployment completed!
pause
